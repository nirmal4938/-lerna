-- Insert into clients
INSERT INTO clients (client_name, "createdAt", "updatedAt") VALUES
('Client A', NOW(), NOW()),
('Client B', NOW(), NOW());

-- Insert into locations
INSERT INTO locations (location_name, client_id, "createdAt", "updatedAt") VALUES
('Location A', (SELECT client_id FROM clients WHERE client_name = 'Client A'), NOW(), NOW()),
('Location B', (SELECT client_id FROM clients WHERE client_name = 'Client B'), NOW(), NOW());

-- Insert into templates
INSERT INTO templates (template_name, location_id, "createdAt", "updatedAt") VALUES
('Template A', (SELECT location_id FROM locations WHERE location_name = 'Location A'), NOW(), NOW()),
('Template B', (SELECT location_id FROM locations WHERE location_name = 'Location B'), NOW(), NOW());

-- Insert into shapes
INSERT INTO shapes (type, x, y, width, height, device_id, template_id, "createdAt", "updatedAt") VALUES
('rectangle', 10, 20, 100, 50, 1, (SELECT template_id FROM templates WHERE template_name = 'Template A'), NOW(), NOW()),
('circle', 30, 40, 50, 50, 2, (SELECT template_id FROM templates WHERE template_name = 'Template B'), NOW(), NOW());

-- Insert into tanks
INSERT INTO tanks (tank_type, software_device_id, client_id, location_id, "createdAt", "updatedAt") VALUES
('ESR', 'device1', (SELECT client_id FROM clients WHERE client_name = 'Client A'), (SELECT location_id FROM locations WHERE location_name = 'Location A'), NOW(), NOW()),
('GSR', 'device2', (SELECT client_id FROM clients WHERE client_name = 'Client B'), (SELECT location_id FROM locations WHERE location_name = 'Location B'), NOW(), NOW());

-- Insert into PHTDSMeters
INSERT INTO phtdsmeters (software_device_id, client_id, location_id, "createdAt", "updatedAt") VALUES
('device3', (SELECT client_id FROM clients WHERE client_name = 'Client A'), (SELECT location_id FROM locations WHERE location_name = 'Location A'), NOW(), NOW()),
('device4', (SELECT client_id FROM clients WHERE client_name = 'Client B'), (SELECT location_id FROM locations WHERE location_name = 'Location B'), NOW(), NOW());

-- Insert into FlowMeters
INSERT INTO flowmeters (software_device_id, client_id, location_id, "createdAt", "updatedAt") VALUES
('device5', (SELECT client_id FROM clients WHERE client_name = 'Client A'), (SELECT location_id FROM locations WHERE location_name = 'Location A'), NOW(), NOW()),
('device6', (SELECT client_id FROM clients WHERE client_name = 'Client B'), (SELECT location_id FROM locations WHERE location_name = 'Location B'), NOW(), NOW());

-- Insert into pumps
INSERT INTO pumps (software_device_id, client_id, location_id, "createdAt", "updatedAt") VALUES
('device7', (SELECT client_id FROM clients WHERE client_name = 'Client A'), (SELECT location_id FROM locations WHERE location_name = 'Location A'), NOW(), NOW()),
('device8', (SELECT client_id FROM clients WHERE client_name = 'Client B'), (SELECT location_id FROM locations WHERE location_name = 'Location B'), NOW(), NOW());
