export const usStates = [
  { name: "ALABAMA", abbreviation: "AL" },
  { name: "ALASKA", abbreviation: "AK" },
  { name: "AMERICAN SAMOA", abbreviation: "AS" },
  { name: "ARIZONA", abbreviation: "AZ" },
  { name: "ARKANSAS", abbreviation: "AR" },
  { name: "CALIFORNIA", abbreviation: "CA" },
  { name: "COLORADO", abbreviation: "CO" },
  { name: "CONNECTICUT", abbreviation: "CT" },
  { name: "DELAWARE", abbreviation: "DE" },
  { name: "DISTRICT OF COLUMBIA", abbreviation: "DC" },
  { name: "FEDERATED STATES OF MICRONESIA", abbreviation: "FM" },
  { name: "FLORIDA", abbreviation: "FL" },
  { name: "GEORGIA", abbreviation: "GA" },
  { name: "GUAM", abbreviation: "GU" },
  { name: "HAWAII", abbreviation: "HI" },
  { name: "IDAHO", abbreviation: "ID" },
  { name: "ILLINOIS", abbreviation: "IL" },
  { name: "INDIANA", abbreviation: "IN" },
  { name: "IOWA", abbreviation: "IA" },
  { name: "KANSAS", abbreviation: "KS" },
  { name: "KENTUCKY", abbreviation: "KY" },
  { name: "LOUISIANA", abbreviation: "LA" },
  { name: "MAINE", abbreviation: "ME" },
  { name: "MARSHALL ISLANDS", abbreviation: "MH" },
  { name: "MARYLAND", abbreviation: "MD" },
  { name: "MASSACHUSETTS", abbreviation: "MA" },
  { name: "MICHIGAN", abbreviation: "MI" },
  { name: "MINNESOTA", abbreviation: "MN" },
  { name: "MISSISSIPPI", abbreviation: "MS" },
  { name: "MISSOURI", abbreviation: "MO" },
  { name: "MONTANA", abbreviation: "MT" },
  { name: "NEBRASKA", abbreviation: "NE" },
  { name: "NEVADA", abbreviation: "NV" },
  { name: "NEW HAMPSHIRE", abbreviation: "NH" },
  { name: "NEW JERSEY", abbreviation: "NJ" },
  { name: "NEW MEXICO", abbreviation: "NM" },
  { name: "NEW YORK", abbreviation: "NY" },
  { name: "NORTH CAROLINA", abbreviation: "NC" },
  { name: "NORTH DAKOTA", abbreviation: "ND" },
  { name: "NORTHERN MARIANA ISLANDS", abbreviation: "MP" },
  { name: "OHIO", abbreviation: "OH" },
  { name: "OKLAHOMA", abbreviation: "OK" },
  { name: "OREGON", abbreviation: "OR" },
  { name: "PALAU", abbreviation: "PW" },
  { name: "PENNSYLVANIA", abbreviation: "PA" },
  { name: "PUERTO RICO", abbreviation: "PR" },
  { name: "RHODE ISLAND", abbreviation: "RI" },
  { name: "SOUTH CAROLINA", abbreviation: "SC" },
  { name: "SOUTH DAKOTA", abbreviation: "SD" },
  { name: "TENNESSEE", abbreviation: "TN" },
  { name: "TEXAS", abbreviation: "TX" },
  { name: "UTAH", abbreviation: "UT" },
  { name: "VERMONT", abbreviation: "VT" },
  { name: "VIRGIN ISLANDS", abbreviation: "VI" },
  { name: "VIRGINIA", abbreviation: "VA" },
  { name: "WASHINGTON", abbreviation: "WA" },
  { name: "WEST VIRGINIA", abbreviation: "WV" },
  { name: "WISCONSIN", abbreviation: "WI" },
  { name: "WYOMING", abbreviation: "WY" },
];

export const months = [
  { name: "JANUARY", abbreviation: "Jan" },
  { name: "FEBRUARY", abbreviation: "Feb" },
  { name: "MARCH", abbreviation: "Mar" },
  { name: "APRIL", abbreviation: "Apr" },
  { name: "MAY", abbreviation: "May" },
  { name: "JUNE", abbreviation: "Jun" },
  { name: "JULY", abbreviation: "Jul" },
  { name: "AUGUST", abbreviation: "Aug" },
  { name: "SEPTEMBER", abbreviation: "Sep" },
  { name: "OCTOBER", abbreviation: "Oct" },
  { name: "NOVEMBER", abbreviation: "Nov" },
  { name: "DECEMBER", abbreviation: "Dec" },
];

export const cardYears = [
  { name: "2023" },
  { name: "2024" },
  { name: "2025" },
  { name: "2026" },
  { name: "2027" },
];

function renderStageIcon(stage, className, file) {
  return (
    <span className={"stageIcon " + className}>
      <img className="image" src={require("../assets/" + file)} alt={stage} />
      <span className="greyText">{stage}</span>
    </span>
  );
}

export function renderProgressBar(stage) {
  // 1=cart, 2=shipping, 3=payment, 4=confirmation
  return (
    <div className="progressBar">
      {renderStageIcon("Cart", "darkImage", "check-mark-svgrepo-com.svg")}
      {stage >= 2 ?
        <span className="darkLine"></span>
      :
        <span className="lightLine"></span>
      }
      {stage >= 2 ?
        renderStageIcon("Delivery", "darkImage", "delivery-van-svgrepo-com.svg")
      :
        renderStageIcon("Delivery", "lightImage", "delivery-van-svgrepo-com.svg")
      }
      {stage >= 3 ? (
        <span className="darkLine"></span>
      ) : (
        <span className="lightLine"></span>
      )}
      {stage >= 3 ?
        renderStageIcon("Payment", "darkImage", "credit-card-svgrepo-com.svg")
        :
        renderStageIcon("Payment", "lightImage", "credit-card-svgrepo-com.svg")
      }
      {stage >= 4 ? (
        <span className="darkLine"></span>
      ) : (
        <span className="lightLine"></span>
      )}
      {stage >= 4 ? (
        renderStageIcon("Confirm", "darkImage", "check-mark-svgrepo-com.svg")
      ) : (
        renderStageIcon("Confirm", "lightImage", "check-mark-svgrepo-com.svg")
      )}
    </div>
  );
}

export function renderProduct(objProduct) {
  return (
    <div key={objProduct.name}>
      <div className="product">
        <img
          src={require("../assets/" + objProduct.name + ".png")}
          alt={objProduct.name}
        />
        <div className="productDesc">
          <h2>{objProduct.name}</h2>
          <p>{objProduct.description}</p>
          <p>
            <em>{objProduct.supportedOS.join(", ")}</em>
          </p>
          <p>
            {objProduct.licenses === 1
              ? objProduct.licenses + " license"
              : objProduct.licenses + " licenses"}
          </p>
        </div>
      </div>
      <div className="numberRight">
        {Number(objProduct.price * objProduct.licenses).toLocaleString(
          "us-US",
          { style: "currency", currency: "USD" }
        )}
      </div>
    </div>
  );
}