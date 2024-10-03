// bg-red-600
// border-red-600
// bg-blue-600 border-blue-600
// bg-green-600 border-green-600
export const STEPPER = [
  {
    title: "Add Image",
    description: "Choose an image in your frame",
    url: "/configure/upload",
  },
  {
    title: "Customize design",
    description: "Make your frame",
    url: "/configure/design",
  },
  {
    title: "summary",
    description: "Review your final design",
    url: "/configure/summary",
  },
];

export const COLORSFRAME = [
  {
    title: "Red",
    color: "red",
  },
  {
    title: "Blue",
    color: "blue",
  },
  {
    title: "black",
    color: "green",
  },
] as const;

export const FRAMESIZES = [
  {
    title: "Small",
    value: "small",
  },
  {
    title: "Medium",
    value: "medium",
  },
  {
    title: "Large",
    value: "large",
  },
] as const;

export const MATERIALS = [
  {
    name: "gold",
    description: "Sexy Memories",
    price: 50,
  },
  {
    name: "diamond",
    description: "Cotting with dimond feels special",
    price: 90,
  },
] as const;

export const FINISHES = [
  {
    name: "smooth",
    description: "Smooth",
    price: 20,
  },
  {
    name: "plaintextured",
    description: "Plain Textured",
    price: 30,
  },
] as const;
