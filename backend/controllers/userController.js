const nodemailer = require("nodemailer");
const User = require('../models/User');

// Fonction pour la réinitialisation du mot de passe
exports.forgotPassword = async (req, res) => {
    const { email } = req.body;

    try {
        // Vérifiez si l'utilisateur existe
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ error: "Aucun utilisateur trouvé avec cet email." });
        }

        // Créez un lien de réinitialisation (simplifié, à sécuriser dans un vrai projet)
        const resetLink = `http://localhost:3000/reset-password/${user._id}`;

        // Configurez un transporteur pour envoyer des e-mails
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: "tidiane1513@gmail.com", // Remplacez par votre adresse e-mail
                pass: "avenue15", // Remplacez par votre mot de passe
            },
        });

        // Envoyez l'e-mail de réinitialisation
        await transporter.sendMail({
            from: '"Support" <your-email@gmail.com>',
            to: email,
            subject: "Réinitialisation du mot de passe",
            text: `Cliquez sur le lien suivant pour réinitialiser votre mot de passe : ${resetLink}`,
            html: `<p>Cliquez sur le lien suivant pour réinitialiser votre mot de passe :</p><a href="${resetLink}">${resetLink}</a>`,
        });

        res.status(200).json({ message: "Lien de réinitialisation envoyé à votre email." });
    } catch (error) {
        console.error("Erreur lors de l'envoi de l'e-mail :", error);
        res.status(500).json({ error: "Une erreur est survenue, veuillez réessayer." });
    }
};
