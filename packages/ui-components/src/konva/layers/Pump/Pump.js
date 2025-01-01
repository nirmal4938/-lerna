import React, { Component } from "react";
import { Stage, Layer, Shape, Text } from "react-konva";
import styled from "styled-components";
import { Html } from "react-konva-utils";
import Konva from "konva";

// SCADA-themed Switch using styled-components
const SCADASwitch = styled.div`
  position: relative;
  width: 80px;
  height: 40px;
  background: #333;
  border-radius: 20px;
  box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.5);
  cursor: pointer;
  margin-bottom: 20px;

  &:before {
    content: "${props => (props.powerOn ? "ON" : "OFF")}";
    position: absolute;
    top: 50%;
    left: ${props => (props.powerOn ? "30%" : "65%")};
    transform: translate(-50%, -50%);
    color: ${props => (props.powerOn ? "#00ff00" : "#ff0000")};
    font-weight: bold;
    font-size: 16px;
  }
`;

const SCADASwitchKnob = styled.div`
  position: absolute;
  top: 5px;
  left: ${props => (props.powerOn ? "calc(100% - 35px)" : "5px")};
  width: 30px;
  height: 30px;
  background: ${props => (props.powerOn ? "#00ff00" : "#ff0000")};
  border-radius: 50%;
  transition: all 0.3s ease;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
`;

class Pump extends Component {
    state = {
        power: 0,
        isAnimating: false,
    };

    handlePowerToggle = () => {
        this.setState((prevState) => ({
            power: prevState.power === 0 ? 1 : 0,
            isAnimating: prevState.power === 0,
        }));
    };

    componentDidUpdate() {
        if (this.state.isAnimating) {
            this.startAnimation();
        } else {
            this.stopAnimation();
        }
    }

    startAnimation() {
        if (this.rotor) {
            this.rotor.to({
                rotation: 360,
                duration: 1,
                easing: Konva.Easings.Linear,
                onFinish: () => {
                    if (this.state.isAnimating) {
                        this.rotor?.rotation(0);
                        this.startAnimation();
                    }
                },
            });
        }
    }

    stopAnimation() {
        if (this.rotor) {
            this.rotor.to({
                rotation: this.rotor.rotation(),
                duration: 0,
                easing: Konva.Easings.Linear,
            });
        }
    }

    drawPumpBody = (context, shape) => {
        context.beginPath();
        context.ellipse(100, 100, 50, 50, 0, 0, Math.PI * 2, false);
        context.closePath();
        context.fillStrokeShape(shape);
    };

    drawRotorGroup = (context, shape) => {
        // Rotor Frame
        context.beginPath();
        context.arc(0, 0, 40, 0, Math.PI * 2, false);
        context.fillStyle = "#eee";
        context.fill();
        context.lineWidth = 2;
        context.strokeStyle = "#666";
        context.stroke();

        // Rotor Background
        context.beginPath();
        context.arc(0, 0, 34, 0, Math.PI * 2, false);
        context.fillStyle = "#777";
        context.fill();
        context.lineWidth = 1;
        context.strokeStyle = "#222";
        context.stroke();

        // Rotor
        context.beginPath();
        context.moveTo(0, 0);
        context.lineTo(0, 25);
        context.lineTo(-8, 10);
        context.lineTo(0, 0);
        context.moveTo(0, 0);
        context.lineTo(0, -25);
        context.lineTo(8, -10);
        context.lineTo(0, 0);
        context.moveTo(0, 0);
        context.lineTo(25, 0);
        context.lineTo(10, 8);
        context.lineTo(0, 0);
        context.moveTo(0, 0);
        context.lineTo(-25, 0);
        context.lineTo(-10, -8);
        context.lineTo(0, 0);
        context.fillStyle = "#bbb";
        context.fill();
        context.lineWidth = 3;
        context.strokeStyle = "#222";
        context.stroke();

        context.fillStrokeShape(shape);
    };

    render() {
        const { power, isAnimating } = this.state;
        const { x, y } = this.props;
        return (
            // <Stage>
            // </Stage>
            <Layer x={x} y={y}>
                {/* Switch */}
                <Html>
                    <SCADASwitch powerOn={power === 1} onClick={this.handlePowerToggle}>
                        <SCADASwitchKnob powerOn={power === 1} />
                    </SCADASwitch>
                </Html>
                {/* Body */}
                <Shape
                    sceneFunc={this.drawPumpBody}
                    stroke="gray"
                    strokeWidth={2}
                    fill="lightgray"
                />

                {/* Rotor Group */}
                <Shape
                    ref={(node) => (this.rotor = node)}
                    x={100}
                    y={100}
                    sceneFunc={this.drawRotorGroup}
                />

                {/* Label */}
                <Text
                    x={80}
                    y={160}
                    text="Pump"
                    fontSize={14}
                    fontFamily="sans-serif"
                    fill="#350100"
                    align="center"
                />
            </Layer>
        );
    }
}

export default Pump;
