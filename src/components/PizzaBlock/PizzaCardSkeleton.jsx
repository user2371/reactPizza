import React from "react"
import ContentLoader from "react-content-loader"

const PizzaCardSkeleton = (props) => (
  <ContentLoader className="pizza-block"
    speed={2}
    width={280}
    height={468}
    viewBox="0 0 280 468"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}
  >
    <circle cx="135" cy="140" r="120" /> 
    <rect x="0" y="270" rx="10" ry="10" width="280" height="27" /> 
    <rect x="0" y="317" rx="10" ry="10" width="280" height="90" /> 
    <rect x="0" y="427" rx="0" ry="0" width="85" height="40" /> 
    <rect x="113" y="427" rx="20" ry="20" width="165" height="40" />
  </ContentLoader>
)

export default PizzaCardSkeleton