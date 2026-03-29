import * as React from "react";

// react
import { useEffect, useState } from "react";

// Material ui components
import Typography from "@mui/material/Typography";
import CloudIcon from "@mui/icons-material/Cloud";
import Button from "@mui/material/Button";

// External libraries
import axios from "axios";
import moment from "moment/min/moment-with-locales";
import "moment/locale/ar";
moment.locale("ar");
import { useTranslation } from "react-i18next";

export default function Weather() {
  const { t, i18n } = useTranslation();
  const [dataAndTime, setDateAndTime] = useState(null);
  const [local, setLocal] = useState("ar");
  const direction = local === "en" ? "ltr" : "rtl";
  const [temp, setTemp] = useState({
    number: null,
    description: "",
    min: null,
    max: null,
    icon: "",
  });
  let cancelAxios = null;

  useEffect(() => {
    i18n.changeLanguage(local);
  }, []);
  useEffect(() => {
    setDateAndTime(t(moment().format("MMMM Do YYYY, h:mm:ss a")));

    axios
      .get(
        "https://api.openweathermap.org/data/2.5/weather?lat=31.5016&lon=34.4667&appid=0c0010c462005fb5cc26e3921b5b4a17&units=metric&lang=en",
        {
          cancelToken: new axios.CancelToken((c) => {
            cancelAxios = c;
          }),
        },
      )
      .then(function (response) {
        // handle success
        const responseTemp = Math.round(response.data.main.temp);
        const min = Math.round(response.data.main.temp_min);
        const max = Math.round(response.data.main.temp_max);
        const description = response.data.weather[0].description;
        const responseIcon = response.data.weather[0].icon;

        setTemp({
          number: responseTemp,
          min,
          max,
          description,
          icon: `https://openweathermap.org/img/wn/${responseIcon}.png`,
        });
      })
      .catch(function (error) {
        console.log(error);
      });

    return () => {
      cancelAxios();
    };
  }, []);
  return (
    <>
      <div className={`w-full`} dir={direction}>
        <div className="bg-[#123c8c] text-white w-full rounded-2xl shadow-2xl shadow-blue-600/80 p-6">
          {/* Header */}
          <div className="flex justify-between items-center mb-2">
            <Typography variant="h4" sx={{ fontWeight: 600 }}>
              {t("Gaza")}
            </Typography>
            <Typography variant="body2">{dataAndTime}</Typography>
          </div>
          <hr className="border-t border-gray-300 mb-4" />

          {/* Content */}
          <div className="flex justify-between items-center gap-5">
            <div className="flex items-start  flex-col">
              <div className="flex gap-6 items-start justify-start ">
                <div className="mb-3">
                  <Typography variant="h2">{temp.number}</Typography>
                </div>
                <div>
                  <img src={temp.icon || null} className="w-20 " />
                </div>
              </div>

              <Typography variant="h6">{t(temp.description)}</Typography>
              <div className="flex gap-5 text-sm mt-3">
                <span>
                  {t("min")}: {temp.min}
                </span>
                <span>|</span>
                <span>
                  {t("max")}: {temp.max}
                </span>
              </div>
            </div>
            <div>
              <CloudIcon style={{ fontSize: 200 }} />
            </div>
          </div>
        </div>

        <Button
          sx={{ color: "white", marginTop: 2 }}
          onClick={() => {
            if (local === "en") {
              setLocal("ar");
              i18n.changeLanguage("ar");
              moment.locale("ar");
            } else {
              setLocal("en");
              i18n.changeLanguage("en");
              moment.locale("en");
            }
            setDateAndTime(moment().format("MMMM Do YYYY, h:mm:ss a"));
          }}
        >
          {t(local === "en" ? "Arabic" : "English")}
        </Button>
      </div>
    </>
  );
}
