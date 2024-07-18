import { DataTypes } from 'sequelize';
import { sequelize } from '../db/database.js';
import { Template } from './Template.js';

export const Location = sequelize.define('locations', {
  location_id: {
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
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  address: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  other_specific_columns: {
    type: DataTypes.JSON,
  },
}, {
  timestamps: true,
});

Location.hasMany(Template, { foreignKey: 'location_id' });
Template.belongsTo(Location, { foreignKey: 'location_id' });
