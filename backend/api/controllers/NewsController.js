/**
 * NewsController
 *
 * @description :: Server-side logic for managing news
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
const fs = require('fs');

module.exports = {
	delete: async ( req , res ) => {
        const id =  req.params('id');
        try{
            News.destroy({id}).exec((err , confirmation)=>{
                if(err){
                    return res.status(400).send('Unable to delete');
                }

                const { image } = confirmation;
               
                // fs.unlink(image.filename, function(err) {
                //     if (err) return console.log(err); // handle error as you wish
                // });

                try{
                    fs.unlinkSync(require('path').resolve(sails.config.appPath, '.tmp/uploads/'+image[0].fd));
                    fs.unlinkSync(require('path').resolve(sails.config.appPath, '.tmp/public/images/'+image[0].fd));
                }catch(e){} 

                return res.send(confirmation);   
            })
        }catch(event){
            console.log(event);
            return res.send('Unable To delete News');
        }
        
    }
};

