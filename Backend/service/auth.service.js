const {UserRepo} = require('../db/repository');
const sendEmail = require('../utilitaire/email/sendEmail');
const {TmpUser} = require('../db/model');


const register = async (userData) =>{
    const {email} = userData 
    console.log('email: ', email)
    const existingUser = await UserRepo.findOneUser({email});
    console.log('existingUser: ', existingUser)
    if(existingUser){
        return { status: 422, message: 'User already exists and is active', data:null };
    }

    const existingTmpUser = await TmpUser.findOne({email});
    console.log('existingTmpUser: ', existingTmpUser)
    if (existingTmpUser) {
      return {
        status: 422, 
        message: `Un processus de creation de compte est déjà en cours pour cet eMail ${email}. Veuillez patienter 10mn pour reprendre si nécéssaire. merci `,
        data: null
       }
    }
  
    try {
        console.log('userData: ', userData)
        const user = await (new TmpUser(userData)).save()
        // const user = await TmpUser.create(userData)
        console.log('user: ', user)
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

module.exports = {register}