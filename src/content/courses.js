import silver from "../images/icons/silver.svg"
import bronze from "../images/icons/bronze.svg"
import gold from "../images/icons/gold.svg"


export const courses = [
  {
    id: "elementary",
    title: "Elementary",
    levelClass: "courseElementary",
    img: silver,
    description:
      "Наш курс английского для новичков поможет вам освоить основы языка: алфавит, грамматику, разговорные навыки и готовность к общению на английском.",
    price: "Для начинающих · 100$",
  },
  {
    id: "intermediate",
    title: "Pre-Intermediate",
    levelClass: "courseIntermediate",
    img: bronze,
    description:
      "Наш курс английского для среднего уровня предназначен для тех, кто уже имеет базовые навыки в английском и желает усовершенствовать их. Расширьте свой словарный запас, углубите знание грамматики.",
    price: "Средний уровень · 100$",
  },
  {
    id: "upper",
    title: "Upper-Intermediate",
    levelClass: "courseUpper",
    img: gold,
    description:
      "Upper Intermediate Course: Продвинутое обучение английскому с фокусом на разговорной практике, грамматике и лексике, а также на чтении и понимании сложных текстов и участии в глубоких дискуссиях на английском.",
    price: "Продвинутый · 100$",
  },
];
