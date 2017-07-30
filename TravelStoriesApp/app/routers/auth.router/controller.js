class StoriesController {
    constructor(data) {
        this.data = data;
    }

    getSignUpForm(req, res) {
        return res.render('auth/sign-up', { title: 'Sign Up' });
    }
    getSignInForm(req, res) {
        return res.render('auth/sign-in', { title: 'Sign In' });
    }
    signOut(req, res) {
        req.logout();
        return res.redirect('/');
    }

    signUp(req, res) {
        const bodyUser = req.body;

        this.data.users.findByUsername(bodyUser.username)
            .then((dbUser) => {
                if (dbUser) {
                    req.flash('error', 'User already exists');
                }

                if (!bodyUser.bio) {
                    bodyUser.bio = 'A traveller from a distant land.';
                }

                return this.data.users.create(bodyUser);
            })
            .catch((err) => {
                req.flash('error', err);
            })
            .then(() => {
                return res.render('auth/sign-up', {
                    messages: req.flash('error'),
                });
            });
    }
}

const init = (data) => {
    return new StoriesController(data);
};

module.exports = { init };
