const {UserRepo} = require('../db/repository');


const register = async (userData) =>{
    const {email} = userData
    const existingUser = await UserRepo.findOne({email});

    if(existingUser){
        return { status: 422, message: 'User already exists and is active', data:null };
    }

    const existingTmpUser = await TmpUser.findOne({email});
  
    if (existingTmpUser) {
      return {
        status: 422, 
        message: `Un processus de creation de compte est déjà en cours pour cet eMail ${email}. Veuillez patienter 10mn pour reprendre si nécéssaire. merci `,
        data: null
       }
    }
  
    try {

      const user = await (new TmpUser(userData)).save()

      const link = `${process.env.URL_PROTOCOL}://${process.env.CLIENT_URL}/#${process.env.ACTIVATION_PATH}?token=${user.token}&id=${user._id}`;
      console.log('link: ', link)
      const payload = {name: user.name, link}

      await sendEmail(user.email, "vérification et activation de compte", payload, "./template/emailVerification.handlebars")
      console.log('Mail sent !!')
      return { status: 200, message: `création de compte entamée avec succes. Un email a été envoyé sur ${user.email}, pour verification et activation. `, data: null}
    
    } catch (error) {
      return {status: 422, message: error.message,  data:  null }
    }

}