import { DataTypes } from 'sequelize';
import { sequelize } from '../db/database.js';
import { Shape } from './Shape.js';

export const Tank = sequelize.define('tanks', {
  tank_id: {
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
  tank_type: {
    type: DataTypes.STRING,
  },
  capacity: {
    type: DataTypes.INTEGER,
  },
  other_specific_columns: {
    type: DataTypes.JSON,
  },
}, {
  timestamps: true,
});

Tank.hasMany(Shape, { foreignKey: 'device_id', sourceKey: 'tank_id' });
Shape.belongsTo(Tank, { foreignKey: 'device_id', targetKey: 'tank_id', constraints: false });
