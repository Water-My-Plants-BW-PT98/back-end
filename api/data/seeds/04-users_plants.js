exports.seed = async function(knex) {
   await knex('users_plants').insert([
     { user_id: 1, plant_id: 1 },
     { user_id: 1, plant_id: 2 },
     { user_id: 1, plant_id: 3 },
     { user_id: 1, plant_id: 4 },
     { user_id: 1, plant_id: 5 },
     { user_id: 2, plant_id: 2 },
     { user_id: 2, plant_id: 4 },
     { user_id: 2, plant_id: 6 },
     { user_id: 2, plant_id: 8 },
     { user_id: 3, plant_id: 1 },
     { user_id: 3, plant_id: 3 },
     { user_id: 3, plant_id: 5 },
     { user_id: 3, plant_id: 6 },
     { user_id: 3, plant_id: 8 },
   ]);
};