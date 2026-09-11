CREATE TABLE organization (
    organization_id SERIAL PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    description TEXT NOT NULL,
    contact_email VARCHAR(255) NOT NULL,
    logo_filename VARCHAR(255) NOT NULL
);
INSERT INTO organization (name, description, contact_email, logo_filename)
VALUES
('BrightFuture Builders', 'A nonprofit focused on improving community infrastructure through sustainable construction projects.', 'info@brightfuturebuilders.org', 'brightfuture-logo.png'),
('GreenHarvest Growers', 'An urban farming collective promoting food sustainability and education in local neighborhoods.', 'contact@greenharvest.org', 'greenharvest-logo.png'),
('UnityServe Volunteers', 'A volunteer coordination group supporting local charities and service initiatives.', 'hello@unityserve.org', 'unityserve-logo.png');
SELECT * FROM organization;

CREATE TABLE service_project (
    project_id SERIAL PRIMARY KEY,
    organization_id INTEGER NOT NULL,
    title VARCHAR(150) NOT NULL,
    description TEXT NOT NULL,
    location VARCHAR(150) NOT NULL,
    date DATE NOT NULL,

    CONSTRAINT fk_service_project_organization
        FOREIGN KEY (organization_id)
        REFERENCES organization(organization_id)
        ON DELETE CASCADE
);

INSERT INTO service_project
(organization_id, title, description, location, date)
VALUES

-- BrightFuture Builders - Organization ID 1
(1, 'Community Center Renovation',
 'Renovation of a local community center to improve accessibility and safety.',
 'Downtown Community Center',
 '2026-09-15'),

(1, 'Playground Restoration',
 'Repair and restoration of playground equipment for children in the community.',
 'Riverside Park',
 '2026-09-22'),

(1, 'Neighborhood Home Repair',
 'Volunteer project to repair damaged homes for low-income families.',
 'Westside Neighborhood',
 '2026-10-05'),

(1, 'School Painting Project',
 'Painting classrooms and common areas at a local public school.',
 'Lincoln Elementary School',
 '2026-10-18'),

(1, 'Community Garden Structures',
 'Construction of raised garden beds and storage structures for a community garden.',
 'Oak Street Community Garden',
 '2026-11-02'),


-- GreenHarvest Growers - Organization ID 2
(2, 'Urban Garden Workshop',
 'Educational workshop teaching residents how to create small urban gardens.',
 'GreenHarvest Community Farm',
 '2026-09-17'),

(2, 'Neighborhood Tree Planting',
 'Planting trees in residential areas to improve green spaces.',
 'Maple Avenue',
 '2026-09-28'),

(2, 'Community Compost Program',
 'Setup of composting stations and education about organic waste recycling.',
 'Central Market',
 '2026-10-08'),

(2, 'School Vegetable Garden',
 'Creation of a vegetable garden where students can learn about sustainable agriculture.',
 'Washington Middle School',
 '2026-10-20'),

(2, 'Harvest Donation Day',
 'Harvesting fresh produce and preparing donations for local food banks.',
 'GreenHarvest Community Farm',
 '2026-11-08'),


-- UnityServe Volunteers - Organization ID 3
(3, 'Food Bank Assistance',
 'Volunteer support for sorting and distributing food donations.',
 'Community Food Bank',
 '2026-09-19'),

(3, 'Senior Center Support Day',
 'Volunteers assisting with activities and maintenance at a local senior center.',
 'Sunrise Senior Center',
 '2026-09-30'),

(3, 'Charity Clothing Drive',
 'Collection and organization of clothing donations for families in need.',
 'UnityServe Headquarters',
 '2026-10-12'),

(3, 'Park Cleanup',
 'Community volunteer event focused on removing litter and maintaining public spaces.',
 'Lakeside Park',
 '2026-10-25'),

(3, 'Holiday Donation Preparation',
 'Sorting and preparing donated items for holiday distribution to local families.',
 'UnityServe Distribution Center',
 '2026-11-15');

 SELECT * FROM service_project;

 CREATE TABLE category (
    category_id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE
);

CREATE TABLE service_project_category (
    project_id INTEGER NOT NULL,
    category_id INTEGER NOT NULL,

    PRIMARY KEY (project_id, category_id),

    CONSTRAINT fk_project
        FOREIGN KEY (project_id)
        REFERENCES service_project(project_id)
        ON DELETE CASCADE,

    CONSTRAINT fk_category
        FOREIGN KEY (category_id)
        REFERENCES category(category_id)
        ON DELETE CASCADE
);

INSERT INTO category (name)
VALUES
('Construction'),
('Environment'),
('Community Support'),
('Education'),
('Food Assistance');

INSERT INTO service_project_category (project_id, category_id)
VALUES
-- BrightFuture Builders
(1, 1),
(2, 1),
(3, 1),
(4, 1),
(4, 4),
(5, 1),
(5, 2),

-- GreenHarvest Growers
(6, 2),
(6, 4),
(7, 2),
(8, 2),
(9, 2),
(9, 4),
(10, 2),
(10, 5),

-- UnityServe Volunteers
(11, 3),
(11, 5),
(12, 3),
(13, 3),
(14, 3),
(14, 2),
(15, 3);

SELECT
    sp.project_id,
    sp.title,
    c.name AS category
FROM service_project sp
JOIN service_project_category spc
    ON sp.project_id = spc.project_id
JOIN category c
    ON spc.category_id = c.category_id
ORDER BY sp.project_id;