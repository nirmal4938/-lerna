import { DataTypes } from "sequelize";
import { sequelize } from "../db/database.js";

export const TemplateDevice = sequelize.define(
  "template_devices",
  {
    template_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'templates',
        key: 'template_id'
      }
    },
    device_type: {
      type: DataTypes.STRING,
    },
    device_id: {
      type: DataTypes.INTEGER,
    },
    software_device_id: {
      type: DataTypes.STRING,
    },
  },
  {
    timestamps: true,
  }
);
