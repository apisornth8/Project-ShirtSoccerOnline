const router = require('express').Router()
const pool = require('../config/database')
const bcrypt = require('bcrypt')
const Joi = require("joi")
const regexPassword = /^(?=.*[a-z])(?=.*[A-Z]).{8,}$/
// ================= REGISTER ==================
// Validate Regiter Page
const regiterSchema = Joi.object({
    username: Joi.string().min(2).required(),
    password: Joi.string().required().regex(regexPassword),
    email: Joi.string().email().required(),
    name: Joi.string().min(2).required(),
    role: Joi.string().allow('Admin', 'User').required()
})
// REGISTER
router.post('/register', async (req, res, next) => {
    const { username, password, email, name, role } = req.body
    console.log(req.body);
    const { error } = regiterSchema.validate(req.body)

    if (error) {
       return res.status(400).send(error.message)
    }

    try {
        // เราต้อง hash password ที่ user กรอกเข้ามาด้วยการใช้ Bcrypt
        const hashed = await bcrypt.hash(password, 10)
        const [data] = await pool.query("insert into `user`(username, password, email, name, role) VALUE(?, ?, ?, ?, ?)", [
            username, hashed, email, name, role
        ])
        return res.json(data).status(200)
    } catch (error) {
        // console.log(error)
        next(error)
       return res.send(error.message)
    }
})
router.get('/product',async (req, res,next)=>{
    const data = await pool.query('SELECT p.name, p.image, p.price, c.name as "club_name", p.quantity, c.id FROM club as c INNER JOIN product as p ON c.id = p.club_id ')
   return res.send(data[0])
})
router.get('/news', async(req, res, next)=>{
    const data = await pool.query('SELECT * FROM news')
   return res.send(data[0])
})
router.delete('/delete/user/:id', async (req, res) =>{
    const id = req.params.id

    const [del_user] = await pool.query('select * from user where id = ?', [id])
    // ตรวจสอบว่าถ้าหาข้อมูลที่จะลบไม่เจอจะ return กลับมาแบบไหน สำคัญ อย่าลืม status และ คำที่ return กลับมา
    if(del_user.length === 0){
        return res.status(404).send({
            "message": "ไม่พบ USER ที่ต้องการลบ"
        })
    }
    const conn = await pool.getConnection()
    await conn.beginTransaction()
    
    try {
        const [data] = await pool.query('DELETE FROM user WHERE id = ?', [id])
        await conn.commit()
        // select ออกมาก่อนเพื่อดูว่าข้อมูลหน้าตาเป็นยังไง
        // บรรทัดที่ 49 จากนั้นค่อยเอาข้อมูลที่รับมาได้มา delete
        // เมื่อลบสำเร็จจะ return กลับไป
        return res.send({
            //todo[0] เวลาเรา get มาได้มันจะอยู่ในรูปแบบของ array จึงต้องมี [0] เพื่อบอกตำแหน่่งของข้อมูลที่เราจะรับมา
            "message": `ลบ USER '${del_user[0].username}' สำเร็จ`,
        })

    } catch (error) {
        // ต้อง rollback กลับไปด้วยหาก ERROR
        await conn.rollback()
        // .status จะมีการสั่งในโจทย์ว่าให้ return status เป็นอะไร
        return res.status(400)
    }finally{
        // ต้องใส่นะะะะ
        conn.release()
    }
})
module.exports = router