const mongoose = require("mongoose")
const ScheduleModel = require("../models/ScheduleModel")

const getSchedules = async (req, res) => {
    try {
        let schedules = await ScheduleModel.find().sort("_id")
        res.status(200).json({ status: 'success', data: schedules });

    } catch (err) {
        console.log(err)
        res.status(500).send(err)
    }
}

const activeSchedule = async (req, res) => {
    const id = req.body.scheduleId
    let active = req.body.active
    try {
        if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No message with that ID')

        await ScheduleModel.findByIdAndUpdate({ _id: id }, { active: active })
        res.status(200).json({ msg: 'success' })

    } catch (error) {
        res.status(500).json({ msg: error })
    }
}

const updateSchedule = async (req, res) => {
    const id = req.body.scheduleId
    let title = req.body.title
    let message = req.body.message
    let startAt = req.body.startAt
    let duration = req.body.duration

    let startAt_H = new Date(startAt).getHours()
    let startAt_M = new Date(startAt).getMinutes()

    try {
        if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No message with that ID')
        await ScheduleModel.findByIdAndUpdate({ _id: id }, { title: title, message: message, duration: duration, startAt: startAt, startAt_H: startAt_H, startAt_M: startAt_M, initState: false })
        let result = await ScheduleModel.findById({ _id: id })
        res.status(200).json({ msg: 'success', data: result })

    } catch (error) {
        res.status(500).json({ msg: error })
    }
}

module.exports = {
    getSchedules,
    updateSchedule,
    activeSchedule
}