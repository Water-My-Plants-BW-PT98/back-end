const bcrypt = require("bcryptjs")


exports.seed = async function(knex) {
   await knex('users').insert([
     {
         username: 'Joe Smith',
         password:  await bcrypt.hash("Lambda1", 12),
         phone_number: '111-111-1111' 
     },
     {
         username: 'Mary Smith',
         password:  await bcrypt.hash("Lambda1", 12),
         phone_number: '222-222-2222' 
     },
     {
         username: 'Kim Smith',
         password:  await bcrypt.hash("Lambda1", 12),
         phone_number: '333-333-3333' 
     }
   ]);
};