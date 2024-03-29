const ReviewService = require("../services/reviewService");

class ReviewController {

	static async createReview(req, res, next){
		try {
			const newReview = req.body;
			newReview.user_id = req.user_id;
			console.log(newReview);
			const result = await ReviewService.createReview({newReview});
			res.status(201).json(result);
		} catch (error) {
			next(error);
		}
	}

	static async getAllReview(req, res, next){
		try {
			const query = req.query;
			let result = null;
			if (query.book_id) {
				result = await ReviewService.getBookReview({book_id: query.book_id});	
			} else {
				result = await ReviewService.getAllReview();
			}
			res.status(200).json(result);
		} catch (error) {
			next(error)
		}
	}
	
	static async getCategoryReview(req, res, next){ //장르별 조회
		try {
			const options = req.query;
			console.log("options: ", options);
			const result = await ReviewService.getCategoryReview(options);
			console.log(result);
			if (result.errorMessage) {
				console.log('에러걸림');
        throw new Error(result.errorMessage)
      }
			
			res.status(200).json(result);
		} catch (error) {
			next(error);
		}
	}

	static async getSearchReview(req, res, next){ //장르별 조회
		try {
			const input = req.params.input;
			console.log("input: ", input);
			const result = await ReviewService.getSearchReview(input);
			console.log(result);
			if (result.errorMessage) {
				console.log('에러걸림');
        throw new Error(result.errorMessage)
      }
			
			res.status(200).json(result);
		} catch (error) {
			next(error);
		}
	}
	
	static async getOneReview(req, res, next){
		try {
			const review_id = req.params.review_id;
			const result = await ReviewService.getOneReview({review_id});
			res.status(200).json(result);
		} catch (error) {
			next(error)
		}
	}
	
	static async reviewCheck(req, res, next){
		try {
			const {book_id} = req.query;
			const user_id = req.user_id;
			const result = await ReviewService.reviewCheck({book_id, user_id});
			res.status(200).json(result);
		} catch (error) {
			next(error)
		}
	}

	static async updateReview(req, res, next){
		try {
			const review_id = req.params.review_id;
			const {...props} = req.body;
        const toUpdate = {...props}

			const result = await ReviewService.updateReview({ review_id, toUpdate });
			res.status(200).json(result);
		} catch (error) {
			next(error);
		}
	}

	static async deleteReview(req, res, next){
		try {
			const review_id = req.params.review_id;

			const result = await ReviewService.deleteReview({ review_id });
			res.status(200).json(result);
		} catch (error) {
			next(error);
		}
	}

}

module.exports = ReviewController;