exports.seed = async function(knex) {
   await knex('users').insert([
     {
         user_id: 1,  
         username: 'Joe Smith',
         password: 'Lambda1',
         phone_number: '111-111-1111' 
     },
     {
         user_id: 2,  
         username: 'Mary Smith',
         password: 'Lambda2',
         phone_number: '222-222-2222' 
     },
     {
         user_id: 3,  
         username: 'Kim Smith',
         password: 'Lambda3',
         phone_number: '333-333-3333' 
     }
   ]);
};