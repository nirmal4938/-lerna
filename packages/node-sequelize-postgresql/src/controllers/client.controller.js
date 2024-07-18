import {Client} from '../models/Client.js'

// Read all
export const getClients = async (req, res) => {
  try {
    const clients = await Client.findAll({
      attributes: [
        "client_id",
        "client_name"
      ],
      order: [["id", "DESC"]],
    });
    res.json(clients);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};