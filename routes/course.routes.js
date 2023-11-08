import { Router } from "express";
import {
  createCourse,
  getAllCourse,
  getLectureByCourseId,
  updateCourse,
  removeCourse,
  addLectureByCourseId,
  deleteLecture,
} from "../controllers/course.controller.js";
import {
  authorizedRoles,
  authorizedSubcriber,
  isLoggedIn,
} from "../middleware/auth.middleware.js";
import upload from "../middleware/multer.middleware.js";
const router = new Router();

// router.get('/', isLoggedIn, getAllCourse)
router
  .route("/")
  .get(getAllCourse)
  .post(upload.single("thumbnail"), createCourse)
  .delete( deleteLecture);

// router.get('/:id', getLectureByCourseId);

router
  .route("/:id")
  .get( getLectureByCourseId)
  .put(  updateCourse)
  .delete(removeCourse)
  .post(
    upload.single("lecture"),
    addLectureByCourseId
  );

export default router;
