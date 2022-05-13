
 const {env} = require('../../_data/site');

 const isScheduledForTheFuture = (post, now = new Date()) => {
   if (!(now instanceof Date)) {
     throw new Error('now argument must by a Date object.');
   }
 
   const postDate = new Date(post.date);
   postDate.setUTCHours(15, 0, 0, 0);
   return postDate.getTime() > now.getTime();
 }

 const isLive = (post) => {
   if (!post.date) {
     throw new Error(`${post.inputPath} did not specify a date.`);
   }
 
   if (!post.data) {
     throw new Error(
       `${post.inputPath} does not have a data object. Are you sure it's a post?`,
     );
   }
 

   if (post.data.scheduled && isScheduledForTheFuture(post)) {
     post.data.draft = true;
   }
 
   if (env === 'dev') {
     return true;
   }
 

   return !post.data.draft;
 }
 
 module.exports = {isLive, isScheduledForTheFuture};