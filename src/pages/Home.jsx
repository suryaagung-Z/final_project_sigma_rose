// component
import React from "react";
import { Icon } from "@iconify/react";
import Header from "../components/Header/Header";
import Frame from "../components/PhotoFrame/Frame";
import FilterCourseHome from "../components/Filter/FilterCourseHome";
import Card from "../components/CourseCard/Card";
import Footer from "../components/Footer/Footer";

import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { consumeCategoriesApi } from "../api/category";
import { getCourses } from "../api/servicesApi";
import { formatRupiah } from "../lib/rupiahFormat";
import AnimatedButton from "../components/Button/AnimatedButton";
import Skeleton from "react-loading-skeleton";
import getCookieValue from "../api/getCookie";
import { useDispatch } from "react-redux";
import { updateId } from "../store/moduleCourses";

import {
  Dialog,
  DialogHeader,
  DialogBody,
  Typography,
} from "@material-tailwind/react";
import "react-loading-skeleton/dist/skeleton.css";

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const token = getCookieValue("token");
  const [categories, setCategories] = useState([]);
  const [course, setCourse] = useState([]);
  const [currentCourse, setCurrentCourse] = useState([]);
  const [courseCategory, setCourseCategory] = useState([]);
  const [titleCategory, setTitleCategory] = useState("");
  const [openCategory, setOpenCategory] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const [openModalPremium, setOpenModalPremium] = useState(false);
  const [courseSelection, setCourseSelection] = useState({});
  const [activeButton, setActiveButton] = useState(null);

  const handleButtonClick = (buttonTitle) => {
    if (activeButton === buttonTitle) {
      setActiveButton(null);
    } else {
      setActiveButton(buttonTitle);
    }
  };

  const handleToggleCategory = () => {
    setOpenCategory(!openCategory);
  };

  const [isMouseDown, setIsMouseDown] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollX, setScrollX] = useState(0);

  const handleMouseDown = (e) => {
    setIsMouseDown(true);
    setStartX(e.pageX - document.getElementById("scrollContainer").offsetLeft);
  };

  const handleMouseMove = (e) => {
    if (!isMouseDown) return;

    const currentX =
      e.pageX - document.getElementById("scrollContainer").offsetLeft;
    const diffX = currentX - startX;

    document.getElementById("scrollContainer").scrollLeft = scrollX - diffX;
  };

  const handleMouseUp = () => {
    setIsMouseDown(false);
    setScrollX(document.getElementById("scrollContainer").scrollLeft);
  };

  const handleOpen = () => setOpenModal(!openModal);
  const handleOpenPremium = () => setOpenModalPremium(!openModalPremium);

  useEffect(() => {
    consumeCategoriesApi.getCategories().then((res) => {
      setIsLoading(true);
      if (res.status === "OK") {
        const currentCategory = res.data || [];
        setCategories(currentCategory);
      }
      setIsLoading(false);
    });

    getCourses().then((res) => {
      setIsLoading(true);
      const response = res.data.data;
      if (res.data.status == "OK") {
        const popularCourse = response.filter((data) => {
          return data.rating >= 4.5;
        });

        const popularCourses = popularCourse.filter(
          (data) => popularCourse.indexOf(data) < 3
        );

        setCourse(popularCourses);
        setCurrentCourse(res.data.data);
        setIsLoading(false);
      }
    });
  }, []);

  const categoryFilterCourse = (category) => {
    const categoryCourseFiltered = currentCourse.filter((data) => {
      return data.category.title == category;
    });
    setCourseCategory(categoryCourseFiltered);
    setTitleCategory(category);
    handleOpen();
  };

  const filterCategories = (titleCategory) => {
    getCourses().then((res) => {
      const response = res.data.data;

      const popularCourse = response.filter((data) => {
        if (data.category.title == titleCategory) {
          return data.rating >= 4.5;
        }
      });

      const popularCourses = popularCourse.filter(
        (data) => popularCourse.indexOf(data) < 3
      );

      setCourse(popularCourses);
    });
  };

  return (
    <section className="" data-idtest="homepage">
      <Header />
      <div className="w-full bg-LIGHTBLUE">
        <div className="grid place-content-center">
          <div className="w-full lg:w-[1024px] py-5">
            <div className="pb-4 flex justify-between">
              <p className="text-xl font-bold">Kategori Belajar</p>
              <div className="flex justify-center items-center gap-1">
                <button
                  onClick={handleToggleCategory}
                  className="text-DARKBLUE05 text-sm font-bold"
                >
                  Lihat Semua
                </button>
                <Icon
                  icon="mingcute:down-line"
                  className="text-DARKBLUE05 text-xl"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-5 justify-between">
              {isLoading
                ? Array.from({ length: 6 }, (_, index) => (
                    <Skeleton key={index + 1} height={"100px"} width={140} />
                  ))
                : categories
                    .map((data) => (
                      <button
                        key={data.id}
                        onClick={() => categoryFilterCourse(data.title)}
                      >
                        <AnimatedButton>
                          <Frame picture={data.image} title={data.title} />
                        </AnimatedButton>
                      </button>
                    ))
                    .slice(0, openCategory ? categories.length : 6)}
            </div>
          </div>
        </div>
      </div>
      <div className="w-full">
        <div className="grid place-content-center">
          <div className="w-full lg:w-[1024px] py-5">
            <div className="pb-4 flex justify-between">
              <p className="text-xl font-bold">Kursus Populer</p>
              <button
                onClick={() => navigate("/courses")}
                className="text-DARKBLUE05 text-sm font-bold"
              >
                Lihat Semua
              </button>
            </div>

            <div
              id="scrollContainer"
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
              className="w-[360px] md:w-[700px] lg:w-full mb-5 gap-2 flex justify-between overflow-x-auto scrollbar-hide"
            >
              <button
                onClick={() => {
                  const popularCourse = currentCourse.filter((data) => {
                    return data.rating >= 4.5;
                  });

                  const popularCourses = popularCourse.filter(
                    (data) => popularCourse.indexOf(data) < 3
                  );
                  setCourse(popularCourses);
                  handleButtonClick("All");
                }}
              >
                <FilterCourseHome
                  title={"All"}
                  activeButton={activeButton}
                  setActiveButton={handleButtonClick}
                />
              </button>
              {categories.map((data) => {
                return (
                  <button
                    onClick={() => {
                      filterCategories(data.title),
                        handleButtonClick(data.title);
                    }}
                    key={data.id}
                  >
                    <FilterCourseHome
                      title={data.title}
                      activeButton={activeButton}
                      setActiveButton={handleButtonClick}
                    />
                  </button>
                );
              })}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-8 justify-between mb-10">
              {isLoading ? (
                <>
                  <div>
                    <Skeleton height={"100px"} width={"323px"} />
                    <Skeleton count={3} />
                  </div>
                  <div>
                    <Skeleton height={"100px"} width={"323px"} />
                    <Skeleton count={3} />
                  </div>
                  <div>
                    <Skeleton height={"100px"} width={"323px"} />
                    <Skeleton count={3} />
                  </div>
                </>
              ) : (
                course.map((data) => {
                  return (
                    <AnimatedButton key={data.id}>
                      <Card
                        onClick={() => {
                          if (data.type === "PREMIUM") {
                            if (token === null) {
                              navigate("/login");
                            } else {
                              handleOpenPremium();
                              setCourseSelection(data);
                              dispatch(updateId(data.id));
                            }
                          } else {
                            navigate("/courses/detail");
                            dispatch(updateId(data.id));
                          }
                        }}
                        picture={data.image}
                        course={data.category.title}
                        rating={data.rating}
                        topic={data.title}
                        author={data.authorBy}
                        level={data.level}
                        module={`${data.module.length} Module`}
                        time={`${
                          data.module.reduce((accumulator, currentValue) => {
                            return accumulator + currentValue.time;
                          }, 0) / 60
                        } Menit`}
                        price={formatRupiah(data.price)}
                      />
                    </AnimatedButton>
                  );
                })
              )}
            </div>
          </div>
        </div>
      </div>
      <Dialog open={openModal} handler={handleOpen}>
        <div className="flex justify-end">
          <button className="px-2 py-2" onClick={handleOpen}>
            <Icon icon="material-symbols:close" className="text-3xl" />
          </button>
        </div>
        <DialogBody className="grid place-items-center gap-4">
          <DialogHeader className="grid place-content-center">
            <Typography variant="h3" className="text-center text-black">
              Kelas {titleCategory}
            </Typography>
          </DialogHeader>
          <div className=" h-[500px] w-[526px] overflow-y-scroll  flex flex-col items-center scrollbar scrollbar-thumb-gray-100 scrollbar-track-white scrollbar-w-2 scrollbar-thumb-rounded-2xl">
            {courseCategory.map((data) => {
              return (
                <div key={data.id} className="my-[20px]">
                  <AnimatedButton>
                    <Card
                      onClick={() => {
                        if (data.type === "PREMIUM") {
                          if (token === null) {
                            navigate("/login");
                            handleOpen();
                          } else {
                            handleOpenPremium();
                            handleOpen();
                            setCourseSelection(data);
                            dispatch(updateId(data.id));
                          }
                        } else {
                          navigate("/courses/detail");
                          handleOpen();
                          dispatch(updateId(data.id));
                        }
                      }}
                      picture={data.image}
                      course={data.category.title}
                      rating={data.rating}
                      topic={data.title}
                      author={data.authorBy}
                      level={data.level}
                      module={`${data.module.length} Module`}
                      time={`${
                        data.module.reduce((accumulator, currentValue) => {
                          return accumulator + currentValue.time;
                        }, 0) / 60
                      } Menit`}
                      price={formatRupiah(data.price)}
                    />
                  </AnimatedButton>
                </div>
              );
            })}
          </div>
        </DialogBody>
      </Dialog>
      <Dialog
        open={openModalPremium}
        handler={() => setOpenModalPremium(!openModalPremium)}
      >
        <div className="flex justify-end">
          <button
            className="px-2 py-2"
            onClick={() => setOpenModalPremium(!openModalPremium)}
          >
            <Icon icon="material-symbols:close" className="text-3xl" />
          </button>
        </div>
        <DialogHeader className="grid place-content-center">
          <Typography variant="h3" className="text-center text-black">
            Selangkah lagi menuju
          </Typography>
          <Typography variant="h3" className="text-center text-DARKBLUE05">
            Kelas Premium
          </Typography>
        </DialogHeader>
        <DialogBody className="grid place-items-center gap-4 text-black">
          <Card
            picture={courseSelection.category?.image}
            course={courseSelection.category?.title}
            rating={courseSelection.rating}
            topic={courseSelection.title}
            author={courseSelection.authorBy}
            level={courseSelection.level}
            module={
              courseSelection.module != null
                ? courseSelection.module.length
                : 10 + " Module"
            }
            time={
              courseSelection.module != null
                ? `${
                    courseSelection.module.reduce(
                      (accumulator, currentValue) => {
                        return accumulator + currentValue.time;
                      },
                      0
                    ) / 60
                  } Menit`
                : "26 Menit"
            }
            price={formatRupiah(courseSelection.price ?? 19999)}
          />
          <AnimatedButton>
            <button
              className="mt-6 w-80 mb-4"
              onClick={() => {
                navigate("/payment");
                handleOpenPremium();
                dispatch(updateId(courseSelection.id));
              }}
            >
              <div className="bg-DARKBLUE05 rounded-full py-3 flex justify-center items-center gap-2">
                <p className="text-white font-bold">Beli Sekarang</p>
                <Icon
                  icon="carbon:next-filled"
                  className="text-white text-2xl"
                />
              </div>
            </button>
          </AnimatedButton>
        </DialogBody>
      </Dialog>
      <Footer />
    </section>
  );
};

export default Home;
