import HomeScreen from "../modals/homeScreenModal.js";
//@desc GET homesrceen
// route GET /api/
// @access Public
const getHomeScreen = async (req, res) => {
    try {
        const Data = await HomeScreen.find({});
        if (Data.length === 0) {
            return res.status(404).json({ success: false, message: 'No data found' });
        }
        res.status(200).json({ success: true, message: 'Data fetched', Data });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};
export { getHomeScreen };