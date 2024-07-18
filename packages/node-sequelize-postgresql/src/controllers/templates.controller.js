import { Template } from '../models/Template.js';
import { Location } from '../models/Location.js';
import { Client } from '../models/Client.js';
import { Shape } from '../models/Shape.js';
import { Tank } from '../models/Tank.js';
import { PHTDSMeter } from '../models/PHTDSMeter.js';
import { FlowMeter } from '../models/Flowmeter.js';
import { Pump } from '../models/Pump.js';

// Get all templates
export const getTemplates = async (req, res) => {
  try {
    const templates = await Template.findAll({
      attributes: ['template_id', 'template_name', 'location_id'],
      include: [
        {
          model: Location,
          attributes: ['location_id', 'location_name'],
          include: {
            model: Client,
            attributes: ['client_id', 'client_name'],
          },
        },
        {
          model: Shape,
          attributes: ['shape_id', 'type', 'x', 'y', 'width', 'height', 'device_id'],
          include: [
            { model: Tank, attributes: ['tank_id', 'software_device_id', 'tank_type'] },
            { model: PHTDSMeter, attributes: ['meter_id', 'software_device_id'] },
            { model: FlowMeter, attributes: ['meter_id', 'software_device_id'] },
            { model: Pump, attributes: ['pump_id', 'software_device_id'] },
          ],
        },
      ],
      order: [['template_id', 'DESC']],
    });
    res.json(templates);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Get template by ID
export const getTemplateById = async (req, res) => {
  const { id } = req.params;
  try {
    const template = await Template.findOne({
      where: { template_id: id },
      attributes: ['template_id', 'template_name', 'location_id'],
      include: [
        {
          model: Location,
          attributes: ['location_id', 'location_name'],
          include: {
            model: Client,
            attributes: ['client_id', 'client_name'],
          },
        },
        {
          model: Shape,
          attributes: ['shape_id', 'type', 'x', 'y', 'width', 'height', 'device_id'],
          include: [
            { model: Tank, attributes: ['tank_id', 'software_device_id', 'tank_type'] },
            { model: PHTDSMeter, attributes: ['meter_id', 'software_device_id'] },
            { model: FlowMeter, attributes: ['meter_id', 'software_device_id'] },
            { model: Pump, attributes: ['pump_id', 'software_device_id'] },
          ],
        },
      ],
    });

    if (!template) {
      return res.status(404).json({ message: 'Template not found' });
    }

    res.json(template);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
