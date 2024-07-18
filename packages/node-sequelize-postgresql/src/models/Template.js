import { DataTypes } from 'sequelize';
import { sequelize } from '../db/database.js';
import { Shape } from './Shape.js';

export const Template = sequelize.define('templates', {
  template_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  location_id: {
    type: DataTypes.INTEGER,
    references: {
      model: 'locations',
      key: 'location_id',
    },
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  timestamps: true,
});

Template.hasMany(Shape, { foreignKey: 'template_id' });
Shape.belongsTo(Template, { foreignKey: 'template_id' });
