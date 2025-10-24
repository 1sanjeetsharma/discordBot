import { nanoid } from 'nanoid'
import Url_Model from '../models/url.js';
async function createShortUrl(originalUrl){
    // Logic to create a short URL
    const shortId = nanoid(8);
    await Url_Model.create({
        original_Url: originalUrl,
        short_Id: shortId,
        visit_history: []
    });
    return shortId;
}
    
async function redirectToOriginalUrl(req,res){
    const shortId =  req.params.id;
    try{
        const urlEntry = await Url_Model.findOne({ short_Id: shortId });
        if(urlEntry){
            await Url_Model.updateOne(
                { short_Id: shortId },
                { $push: { visit_history: new Date() } }
            );
        
            return res.redirect(urlEntry.original_Url); 
        }
        else{
            return res.status(404).send("URL not found");
        }

    }
    catch(error){
        console.error("Error during redirection:", error);
        return res.status(500).send("Internal Server Error");
    }
}

export {createShortUrl, redirectToOriginalUrl}; 