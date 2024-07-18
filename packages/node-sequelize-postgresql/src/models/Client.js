import { DataTypes } from 'sequelize';
import { sequelize } from '../db/database.js';
import { Location } from './Location.js';

export const Client = sequelize.define('clients', {
  client_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  contact_number: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  other_specific_columns: {
    type: DataTypes.JSON,
  },
}, {
  timestamps: true,
});

Client.hasMany(Location, { foreignKey: 'client_id' });
Location.belongsTo(Client, { foreignKey: 'client_id' });
