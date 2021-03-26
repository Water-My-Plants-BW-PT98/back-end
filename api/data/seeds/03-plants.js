exports.seed = async function(knex) {
   await knex('plants').insert([
     {
         plant_id: 1,  
         nickname: 'Ageratum',
         species: 'Asteraceae',
         h2o_frequency: 'daily',
     },
     {
         plant_id: 2,  
         nickname: 'American Marigold',
         species: 'Asteraceae',
         h2o_frequency: 'twice weekly',
     },
     {
         plant_id: 3,  
         nickname: 'Bleeding Heart',
         species: 'Perennial',
         h2o_frequency: 'weekly',
     },
     {
         plant_id: 4,  
         nickname: 'Blue Sage',
         species: 'Lamiaceae',
         h2o_frequency: 'twice weekly',
     },
     {
         plant_id: 5,  
         nickname: 'Canna Lily',
         species: 'Cannaceae',
         h2o_frequency: 'hourly',
     },
     {
         plant_id: 6,  
         nickname: 'Gazania',
         species: 'Asteraceae',
         h2o_frequency: 'weekly',
     },
     {
         plant_id: 7,  
         nickname: 'Japanese Iris',
         species: 'Iridaceae',
         h2o_frequency: 'daily',
     },
     {
         plant_id: 8,  
         nickname: 'Lilac',
         species: 'Oleaceae',
         h2o_frequency: 'twice monthly',
      },
   
   ]);
};