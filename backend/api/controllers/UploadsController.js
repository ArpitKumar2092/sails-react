/**
 * UploadsController
 *
 * @description :: Server-side logic for managing uploads
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
const fs = require('fs');



module.exports = {

    update : function (req , res){
        const id = req.param('id');
         try{
        Uploads.destroy({id}).exec(function(err , data){
            if(err){console.log(err)}
                console.log(data);
            if(data.length > 0){
            const name = data[0].fd;
           
                fs.unlinkSync(require('path').resolve(sails.config.appPath, '.tmp/uploads/'+name));
                fs.unlinkSync(require('path').resolve(sails.config.appPath, '.tmp/public/images/'+name));
            }
 
        });
        }catch(E){}
        return this.image(req , res)
    },    

    image : function(req , res){
        // This can be replace with any cloud storage Like S3 & Azure
        req.file('image').upload(function (err, uploadedFiles) {
            if (err) return res.serverError(err);
           console.log( uploadedFiles);
            Uploads.create(uploadedFiles).exec((err , confirmation)=>{
                if(err){
                    return res.status(400).send('Unable to upload image');
                }
                console.log(confirmation)

                fs.copyFile(
                require('path').resolve(sails.config.appPath, '.tmp/uploads/'+confirmation[0].fd)
                , 
                require('path').resolve(sails.config.appPath, '.tmp/public/images/'+confirmation[0].fd), (err) => {
                    if (err) throw err;
                    console.log('source.txt was copied to destination.txt');
                  });


                // File.move(
                //     require('path').resolve(sails.config.appPath, '.tmp/upload/'+confirmation[0].fd),
                //     require('path').resolve(sails.config.appPath, '.tmp/public/images/'+confirmation[0].fd),
                //     function( err ){
                //         console.log( err );
                //     }
                // );
                return res.json({
                    message: uploadedFiles.length + ' file(s) uploaded successfully!',
                    files: confirmation
                });
                
            })
        });

    }
};

