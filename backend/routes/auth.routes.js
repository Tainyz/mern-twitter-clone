import expresss from 'express';

const router = expresss.Router();

router.get('/signup', (req, res) => {
    res.json({
        data : 'Signup Endpoint',
    });
});

export default router;