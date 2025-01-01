import React, { Component } from "react";
import { Stage, Layer, Shape } from "react-konva";
import { Html } from "react-konva-utils";
import { Chart } from "react-google-charts";

function getRandomNumber() {
    return Math.random() * 100;
}

export const options = {
    width: 120,
    height: 80,
    redFrom: 90,
    redTo: 100,
    yellowFrom: 75,
    yellowTo: 90,
    minorTicks: 5,
};

class Dial extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [["Label", "Value"], ["pH", getRandomNumber()]],
        };
    }

    componentDidMount() {
        this.intervalId = setInterval(() => {
            this.setState({
                data: [["Label", "Value"], ["pH", getRandomNumber()]],
            });
        }, 3000);
    }

    componentWillUnmount() {
        clearInterval(this.intervalId);
    }

    drawStand = (context, shape) => {
        context.beginPath();
        context.moveTo(50, 100); // Start at the bottom center of the dial
        context.lineTo(30, 120); // Left side of the stand
        context.lineTo(70, 120); // Right side of the stand
        context.closePath();
        context.fillStrokeShape(shape);
    };

    render() {
        const { x, y } = this.props;

        return (
            // <Stage width={200} height={150}>
            <Layer x={x} y={y}>
                {/* Stand Shape */}
                <Shape
                    sceneFunc={this.drawStand}
                    fill="gray"
                    stroke="black"
                    strokeWidth={2}
                />

                {/* Dial Component */}
                <Html>
                    <div style={{ position: "absolute", top: 10, left: 40 }}>
                        <Chart
                            chartType="Gauge"
                            width="120px"
                            height="80px"
                            data={this.state.data}
                            options={options}
                        />
                    </div>
                </Html>
            </Layer>
            // </Stage>
        );
    }
}

export default Dial;
