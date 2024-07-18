import { DataTypes } from 'sequelize';
import { sequelize } from '../db/database.js';
import { Shape } from './Shape.js';

export const PHTDSMeter = sequelize.define('phtdsmeters', {
  meter_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  client_id: {
    type: DataTypes.INTEGER,
    references: {
      model: 'clients',
      key: 'client_id',
    },
  },
  location_id: {
    type: DataTypes.INTEGER,
    references: {
      model: 'locations',
      key: 'location_id',
    },
  },
  software_device_id: {
    type: DataTypes.STRING,
    unique: true,
  },
  reading: {
    type: DataTypes.FLOAT,
  },
  other_specific_columns: {
    type: DataTypes.JSON,
  },
}, {
  timestamps: true,
});

PHTDSMeter.hasMany(Shape, { foreignKey: 'device_id', sourceKey: 'meter_id' });
Shape.belongsTo(PHTDSMeter, { foreignKey: 'device_id', targetKey: 'meter_id', constraints: false });
