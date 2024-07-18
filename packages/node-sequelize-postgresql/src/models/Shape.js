import { DataTypes } from 'sequelize';
import { sequelize } from '../db/database.js';

export const Shape = sequelize.define('shapes', {
  shape_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  type: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  x: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  y: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  width: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  height: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  device_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  template_id: {
    type: DataTypes.INTEGER,
    references: {
      model: 'templates',
      key: 'template_id',
    },
  },
}, {
  timestamps: true,
});
