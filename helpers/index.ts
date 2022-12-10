export const emailRegex: RegExp = /^[^\s@]+@[^\s@]+\.([^\s@]{2,})+$/;

type IFormat = "mm" | "hh" | "dd";

export const numberFormaTime = (time: number, format: IFormat): number => {
  switch (format) {
    case "dd":
      return time * 60 * 60 * 24 * 1000;
    case "hh":
      return time * 60 * 60 * 1000;
    case "mm":
      return time * 60 * 1000;
    default:
      return 60 * 60 * 24 * 1000;
  }
};

interface IResGetTime {
  getTime: number;
  getFormat: IFormat;
}

export const getTimeNumber = (timeNumber: number): IResGetTime => {
  console.log('timeNumber', timeNumber)
  const time = timeNumber / (1000 * 60);
  console.log('time', time)

  if (time % 24 === 0) {
    console.log("entre % 24", time / (24 * 60));
    return { getTime: time / (24 * 60), getFormat: "dd" };
  } else if (time / 60 > 1) {
    console.log("entre % 60", time / (60));
    return { getTime: time / 60, getFormat: "hh" };
  } else {
    console.log("entre DEFAULT", time);
    return { getTime: time, getFormat: "mm" };
  }
};
