exports.seed = async function(knex) {
   await knex('users').insert([
     {
         username: 'Joe Smith',
         password: 'Lambda1',
         phone_number: '111-111-1111' 
     },
     {
         username: 'Mary Smith',
         password: 'Lambda2',
         phone_number: '222-222-2222' 
     },
     {
         username: 'Kim Smith',
         password: 'Lambda3',
         phone_number: '333-333-3333' 
     }
   ]);
};