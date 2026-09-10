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