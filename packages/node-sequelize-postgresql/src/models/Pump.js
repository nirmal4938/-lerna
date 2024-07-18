import { DataTypes } from 'sequelize';
import { sequelize } from '../db/database.js';
import { Shape } from './Shape.js';

export const Pump = sequelize.define('pumps', {
  pump_id: {
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
  other_specific_columns: {
    type: DataTypes.JSON,
  },
}, {
  timestamps: true,
});

Pump.hasMany(Shape, { foreignKey: 'device_id', sourceKey: 'pump_id' });
Shape.belongsTo(Pump, { foreignKey: 'device_id', targetKey: 'pump_id', constraints: false });
