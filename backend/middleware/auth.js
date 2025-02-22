const auth = (req, res, next) => {
    const userRole = req.headers['x-user-role']; // Simulación de roles
    if (!userRole || userRole !== 'admin') {
        return res.status(403).json({ error: 'Acceso denegado' });
    }
    next();
};

module.exports = auth;