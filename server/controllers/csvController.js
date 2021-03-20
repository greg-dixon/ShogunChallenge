import axios from 'axios'

const csvController = {}

csvController.retrieve = (req, res, next) => {
    axios.get('../csv/addresses.csv')
        .then(data => console.log(data))
}

export default csvController