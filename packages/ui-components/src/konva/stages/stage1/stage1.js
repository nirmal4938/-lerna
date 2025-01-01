import React, { useState, useEffect } from "react";
import { Stage, Layer, Rect, Group, Shape, Circle, Text } from "react-konva";
import mqtt from "mqtt";
import { Dial, Pump } from "../../layers";
import { Html } from "react-konva-utils";
import { FiberProvider } from 'its-fine';

// MQTT Config
const MQTT_BROKER_URL = "ws://broker.hivemq.com:8000/mqtt"; // Example broker URL
const MQTT_TOPICS = {
    autoManual: "scada/auto_manual",
    eStop: "scada/e_stop",
    pump: "scada/pump"
};

// Background Layer
const BackgroundLayer = () => (
    <Layer>
        <Rect
            x={0}
            y={0}
            width={window.innerWidth}
            height={window.innerHeight}
            fill="#b7b7b7" // Background color
        />
    </Layer>
);

// Hamburger Icon
const HamburgerIcon = ({ x, y, onClick }) => (
    <Shape
        x={x}
        y={y}
        sceneFunc={(context, shape) => {
            const lineHeight = 3;
            context.beginPath();
            context.moveTo(0, 0);
            context.lineTo(30, 0);
            context.moveTo(0, 10);
            context.lineTo(30, 10);
            context.moveTo(0, 20);
            context.lineTo(30, 20);
            context.lineWidth = lineHeight;
            context.strokeStyle = "#fff";
            context.stroke();
            context.closePath();
            context.fillStrokeShape(shape);
        }}
        onClick={onClick}
        width={30}
        height={30}
        cursor="pointer"
        listening={true}
        draggable={false}
    />
);

// Circular Button Component
const CircularButton = ({ x, y, radius, fill, text, onClick, disabled }) => (
    <Group x={x} y={y} width={radius * 2} height={radius * 2} offsetX={radius} offsetY={radius}>
        <Circle
            radius={radius}
            fill={fill}
            stroke="#000"
            strokeWidth={2}
            shadowBlur={8}
            shadowColor="#000"
            onClick={!disabled ? onClick : null}
            cursor={disabled ? 'not-allowed' : 'pointer'}
        />
        <Text
            text={text}
            fontSize={14}
            fill="#fff"
            width={radius * 2}
            height={radius * 2}
            align="center"
            verticalAlign="middle"
            offsetX={radius}
            offsetY={radius}
        />
    </Group>
);

// Control Panel Drawer with MQTT Integration
const ControlPanelDrawer = ({ isOpen, width, height, onToggle }) => {
    const [isAutoMode, setIsAutoMode] = useState(false);
    const [isEStopActive, setIsEStopActive] = useState(false);
    const [client, setClient] = useState(null);

    const drawerX = isOpen ? window.innerWidth - width : window.innerWidth;
    const toggleIconX = isOpen ? drawerX - 40 : window.innerWidth - 40;

    // Connect to MQTT Broker
    useEffect(() => {
        const mqttClient = mqtt.connect(MQTT_BROKER_URL);

        mqttClient.on("connect", () => {
            console.log("Connected to MQTT broker");
            mqttClient.subscribe(MQTT_TOPICS.autoManual);
            mqttClient.subscribe(MQTT_TOPICS.eStop);
            mqttClient.subscribe(MQTT_TOPICS.pump);
        });

        mqttClient.on("message", (topic, message) => {
            const payload = message.toString();
            if (topic === MQTT_TOPICS.autoManual) {
                setIsAutoMode(payload === "true");
            } else if (topic === MQTT_TOPICS.eStop) {
                setIsEStopActive(payload === "true");
            }
        });

        setClient(mqttClient);

        return () => {
            mqttClient.end();
        };
    }, []);

    // Handle Button Clicks
    const handleAutoManualToggle = () => {
        const newMode = !isAutoMode;
        client.publish(MQTT_TOPICS.autoManual, String(newMode));
        setIsAutoMode(newMode);
    };

    const handleEStopToggle = () => {
        const newStatus = !isEStopActive;
        client.publish(MQTT_TOPICS.eStop, String(newStatus));
        setIsEStopActive(newStatus);
    };

    const handlePumpToggle = () => {
        if (!isAutoMode) {
            client.publish(MQTT_TOPICS.pump, "toggle");
        }
    };

    // Calculate centered positions
    const centerX = drawerX + width / 2;

    return (
        <Layer>
            {/* Drawer Background */}
            <Rect
                x={drawerX}
                y={0}
                width={width}
                height={height}
                fill="#444" // Darker, industrial-style background
                shadowBlur={10}
                shadowColor="#000"
            />

            {/* Toggle Icon */}
            <HamburgerIcon
                x={toggleIconX} // Adjusted position based on drawer state
                y={height / 2 - 15}
                onClick={onToggle}
            />

            {/* Control Elements */}
            <Group x={centerX - 50} y={height / 2 - 100} align="center">
                {/* Auto/Manual Indication Button */}
                <CircularButton
                    x={0}
                    y={0}
                    radius={40}
                    fill={isAutoMode ? "#00ff00" : "#ff0000"} // Green for Auto, Red for Manual
                    text={isAutoMode ? "Auto" : "Manual"}
                    onClick={handleAutoManualToggle}
                />

                {/* E-Stop Indication Button */}
                <CircularButton
                    x={0}
                    y={60}
                    radius={40}
                    fill={isEStopActive ? "#ff0000" : "#00ff00"} // Red for Activated, Green for Deactivated
                    text={isEStopActive ? "E-Stop" : "Reset"}
                    onClick={handleEStopToggle}
                />

                {/* Pump On/Off Button */}
                <CircularButton
                    x={0}
                    y={120}
                    radius={40}
                    fill={isAutoMode ? "#888" : "#555"} // Disabled color if Auto Mode is active
                    text="Pump"
                    onClick={handlePumpToggle}
                    disabled={isAutoMode}
                />
            </Group>
        </Layer>
    );
};

export const Stage1 = () => {
    const [isDrawerOpen, setIsDrawerOpen] = useState(true); // Start with the drawer open

    const toggleDrawer = () => {
        setIsDrawerOpen((prevState) => !prevState);
    };

    const stageWidth = window.innerWidth;
    const stageHeight = window.innerHeight;
    const drawerWidth = 250;

    const pumpX = stageWidth / 8;  // 1/8th of the stage width
    const pumpY = stageHeight / 2; // Center vertically

    const dialX = (3 * stageWidth) / 4; // 3/4th of the stage width
    const dialY = stageHeight / 2; // Center vertically
    console.log("stageWidth", stageWidth)
    return (
        <Stage width={1505} height={stageHeight}
            scale={{ x: 0.95, y: 1 }}
        >
            <BackgroundLayer />
            <Pump x={pumpX} y={pumpY} power={50} />
            <Dial x={dialX} y={dialY} />
            <ControlPanelDrawer
                isOpen={isDrawerOpen}
                width={drawerWidth}
                height={stageHeight}
                onToggle={toggleDrawer}
            />
        </Stage>

    );
};
