import { useState, useRef, useEffect } from "react";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import {
  Anchor,
  Button,
  Field,
  IconButton,
  Input,
  Notification,
  Tag,
} from "@zendesk-ui/react-components";
import { SearchIcon, SparkleIcon, ChevronDownIcon } from "../Icons";
import TopBar from "../TopBar/TopBar";
import PageSidebarNav from "../PageSidebarNav";

import {
  adminCenterPrimaryNavItems as primaryNavItems,
  adminCenterSecondaryNavSections as secondaryNavSections,
} from "../AdminCenterNav";

import QueuesTable from "./QueuesTable";
import QueueEditPage from "./QueueEditPage";
import DataWidget from "../DataWidget";
import CopilotSidebar from "../CopilotSidebar/CopilotSidebar";

import {
  RecommendationsBanner,
  RecommendationCard,
  RecommendationDetailView,
  RecommendationsDrawer,
} from "../RoutingRecommendations";

import { assetUrl } from "../../utils/assetUrl";
import "./QueuesPage.css";

function ExternalLinkIcon({ className }) {
  return <span className={className} aria-hidden="true" />;
}

function PromoCloseIcon({ className }) {
  return (
    <svg
      className={className}
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M4 4L12 12"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M12 4L4 12"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

function HelpIcon({ className }) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M3.54687 4.72616C2.37131 6.16272 1.66602 7.99904 1.66602 10.0001C1.66602 12.0012 2.37133 13.8375 3.54693 15.2741L6.82442 11.9966C6.46012 11.4185 6.24935 10.7339 6.24935 10.0001C6.24935 9.26633 6.4601 8.58175 6.82437 8.00366L3.54687 4.72616Z"
        fill="currentColor"
      />
      <path
        d="M4.72538 3.54765L8.00287 6.82514C8.58102 6.46085 9.26552 6.25008 9.99935 6.25008C10.7332 6.25008 11.4178 6.46085 11.9958 6.82515L15.2733 3.54766C13.8368 2.37206 12.0004 1.66675 9.99935 1.66675C7.99827 1.66675 6.16194 2.37206 4.72538 3.54765Z"
        fill="currentColor"
      />
      <path
        d="M16.4518 4.72618L13.1743 8.00368C13.5386 8.58175 13.7493 9.26633 13.7493 10.0001C13.7493 10.7339 13.5386 11.4184 13.1743 11.9966L16.4518 15.2741C17.6274 13.8375 18.3327 12.0012 18.3327 10.0001C18.3327 7.99904 17.6274 6.16273 16.4518 4.72618Z"
        fill="currentColor"
      />
      <path
        d="M15.2733 16.4526L11.9958 13.1751C11.4177 13.5393 10.7331 13.7501 9.99935 13.7501C9.2656 13.7501 8.58102 13.5393 8.00295 13.1751L4.72545 16.4526C6.162 17.6282 7.99831 18.3334 9.99935 18.3334C12.0004 18.3334 13.8367 17.6281 15.2733 16.4526Z"
        fill="currentColor"
      />
    </svg>
  );
}

function AdminCenterLogo({ className }) {
  return (
    <svg
      className={className}
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12.3027 2.00049C12.6982 2.24413 13.0689 2.52354 13.4102 2.83487C14.0949 3.45905 14.6771 4.19128 15.1299 5.00098C15.2646 5.24213 15.3877 5.49025 15.499 5.74415C15.8428 5.19083 16.257 4.6838 16.7339 4.23633C17.3486 3.66016 18.0598 3.19775 18.8359 2.86816C18.9473 2.82129 19.0615 2.78003 19.1777 2.74414C18.875 3.56396 18.7119 4.44287 18.7119 5.36035C18.7119 9.22656 21.8457 12.3604 25.7119 12.3604C25.8066 12.3604 25.9009 12.3582 25.9949 12.354C25.998 12.4336 25.9996 12.5137 25.9996 12.5942C25.9996 16.9785 22.9727 20.6641 18.875 21.7578V21.7559C18.5127 21.8516 18.1426 21.9238 17.7656 21.9707C17.2549 22.0352 16.7354 22.0518 16.2168 22.0195C14.6855 21.9209 13.2363 21.4355 11.999 20.6445C11.9238 20.5967 11.8496 20.5479 11.7764 20.498C11.5869 20.8408 11.3721 21.1689 11.1338 21.4795C10.5732 22.21 9.89648 22.8447 9.13477 23.3574C8.54492 23.7539 7.90527 24.0781 7.22852 24.3203C5.71387 24.8623 4.06543 24.9707 2.49023 24.6182C1.53223 24.4033 0.615234 24.0449 -0.242188 23.5537V23.5557C0.418945 22.7559 0.949219 21.8564 1.32422 20.8877C1.72559 19.8516 1.94727 18.7441 1.96875 17.5996C1.96875 17.5488 1.96875 17.499 1.9668 17.4482C2.48145 17.4873 3.00098 17.4814 3.5166 17.4287C5.4375 17.2314 7.24707 16.4258 8.64941 15.127C9.29102 14.5322 9.8418 13.8408 10.2793 13.0742C10.1279 12.9209 9.98242 12.7617 9.84277 12.5967C9.06738 11.6807 8.47461 10.6162 8.10156 9.46387C7.77539 8.45996 7.61523 7.40137 7.63184 6.33398C7.64746 5.3291 7.82617 4.33691 8.15918 3.39648C8.5166 2.38574 9.05371 1.44629 9.74512 0.617676C10.1318 0.154785 10.5625 -0.264648 11.0303 -0.634766C11.1162 -0.0673828 11.2451 0.494141 11.415 1.04541C11.6572 1.83008 11.9561 2.5918 12.3027 3.32422V2.00049Z"
        fill="currentColor"
      />
    </svg>
  );
}

// Sample queues data matching Figma design
const sampleQueues = [
  {
    id: 1,
    name: "VIP / Escalations",
    description: "VIP and escalation tickets",
    subqueue: null,
    priority: { main: "1", more: 0, items: ["1"] },
    primaryGroups: {
      main: "VIP, Escalations",
      more: 0,
      items: ["VIP, Escalations"],
    },
    secondaryGroups: {
      main: "Billing, Payments",
      more: 0,
      items: ["Billing, Payments"],
    },
    assignmentMethod: "Initial routing configuration",
    conditions: { all: [], any: [] },
    distributeSubqueues: false,
  },
  {
    id: 2,
    name: "Technical Support \u2014 Tier 1",
    description: "Tier 1 technical support tickets",
    subqueue: null,
    priority: { main: "1", more: 0, items: ["1"] },
    primaryGroups: {
      main: "Advanced Technical",
      more: 0,
      items: ["Advanced Technical"],
    },
    secondaryGroups: {
      main: "Technical Support",
      more: 0,
      items: ["Technical Support"],
    },
    assignmentMethod: "Predictive routing",
    conditions: { all: [], any: [] },
    distributeSubqueues: false,
  },
  {
    id: 3,
    name: "Technical Support \u2014 Tier 2",
    description: "Tier 2 technical support tickets",
    subqueue: null,
    priority: { main: "2", more: 0, items: ["2"] },
    primaryGroups: {
      main: "Technical Support",
      more: 0,
      items: ["Technical Support"],
    },
    secondaryGroups: {
      main: "Advanced Technical",
      more: 0,
      items: ["Advanced Technical"],
    },
    assignmentMethod: "Predictive routing",
    conditions: { all: [], any: [] },
    distributeSubqueues: false,
  },
  {
    id: 4,
    name: "Billing",
    description: "Billing related tickets",
    subqueue: null,
    priority: { main: "2", more: 0, items: ["2"] },
    primaryGroups: {
      main: "Billing, Payments",
      more: 0,
      items: ["Billing, Payments"],
    },
    secondaryGroups: {
      main: "Customer Experience",
      more: 0,
      items: ["Customer Experience"],
    },
    assignmentMethod: "Predictive routing",
    conditions: { all: [], any: [] },
    distributeSubqueues: false,
  },
  {
    id: 5,
    name: "Order Management",
    description: "Order management tickets",
    subqueue: null,
    priority: { main: "3", more: 0, items: ["3"] },
    primaryGroups: {
      main: "Order Operations",
      more: 0,
      items: ["Order Operations"],
    },
    secondaryGroups: {
      main: "Billing, Payments",
      more: 0,
      items: ["Billing, Payments"],
    },
    assignmentMethod: "Predictive routing",
    conditions: { all: [], any: [] },
    distributeSubqueues: false,
  },
  {
    id: 6,
    name: "Refunds & Returns",
    description: "Refund and return tickets",
    subqueue: null,
    priority: { main: "3", more: 0, items: ["3"] },
    primaryGroups: {
      main: "Customer Experience",
      more: 0,
      items: ["Customer Experience"],
    },
    secondaryGroups: {
      main: "Order Operations",
      more: 0,
      items: ["Order Operations"],
    },
    assignmentMethod: "Initial routing configuration",
    conditions: { all: [], any: [] },
    distributeSubqueues: false,
  },
  {
    id: 7,
    name: "Sales Inquiries",
    description: "Sales inquiry tickets",
    subqueue: null,
    priority: { main: "3", more: 0, items: ["3"] },
    primaryGroups: {
      main: "Sales, Retention",
      more: 0,
      items: ["Sales, Retention"],
    },
    secondaryGroups: {
      main: "Onboarding Specialists",
      more: 0,
      items: ["Onboarding Specialists"],
    },
    assignmentMethod: "Predictive routing",
    conditions: { all: [], any: [] },
    distributeSubqueues: false,
  },
  {
    id: 8,
    name: "Onboarding & Activation",
    description: "Onboarding and activation tickets",
    subqueue: null,
    priority: { main: "4", more: 0, items: ["4"] },
    primaryGroups: {
      main: "Onboarding Specialists",
      more: 0,
      items: ["Onboarding Specialists"],
    },
    secondaryGroups: {
      main: "Sales, Retention",
      more: 0,
      items: ["Sales, Retention"],
    },
    assignmentMethod: "Initial routing configuration",
    conditions: { all: [], any: [] },
    distributeSubqueues: false,
  },
];

// Book open icon image path
const bookOpenIconSrc = assetUrl(
  "/assets/Book_open-706cd137-7b94-449e-afad-ba613a78f0d9.png",
);

function BookOpenIcon({ className }) {
  return (
    <img
      className={className}
      src={bookOpenIconSrc}
      alt="Book open"
      width="40"
      height="40"
    />
  );
}

// Sparkle icon for analyzing state
function SparkleAnalyzingIcon({ className }) {
  return (
    <svg
      className={className}
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12 2L13.09 8.26L18 6L14.74 10.91L21 12L14.74 13.09L18 18L13.09 15.74L12 22L10.91 15.74L6 18L9.26 13.09L3 12L9.26 10.91L6 6L10.91 8.26L12 2Z"
        fill="url(#sparkle-gradient)"
      />
      <defs>
        <linearGradient
          id="sparkle-gradient"
          x1="3"
          y1="2"
          x2="21"
          y2="22"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#8DD44A" />
          <stop offset="1" stopColor="#038153" />
        </linearGradient>
      </defs>
    </svg>
  );
}

// Large sparkle icon for analyzing header
function SparkleHeaderIcon({ className }) {
  return (
    <img
      className={className}
      src={assetUrl("/assets/Sparkle-063d706a-c098-4781-a5bc-a30e5b22cedf.png")}
      alt=""
      width="40"
      height="40"
    />
  );
}

// Chevron icon for collapsible section
function ChevronUpIcon({ className }) {
  return (
    <svg
      className={className}
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M4 10L8 6L12 10"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ChevronRightIcon({ className }) {
  return (
    <svg
      className={className}
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M4.5 2.5L7.5 6L4.5 9.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// Info icon for metrics cards
function MetricsInfoIcon({ className }) {
  return (
    <img
      className={className}
      src={assetUrl("/assets/info-18f1df92-474a-4b7f-9d28-76109bee24c9.png")}
      alt=""
      width="16"
      height="16"
    />
  );
}

// Chevron down icon for metrics improvement indicator
function MetricsChevronDownIcon({ className }) {
  return (
    <svg
      className={className}
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M3 4.5L6 7.5L9 4.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// Queue-specific evaluation data - different data points per queue
const QUEUE_EVALUATION_DATA = {
  1: {
    // Billing queue
    tickets: "12,450",
    days: "90",
    agents: "24",
    skills: "6",
    results: {
      aht: {
        improvement: "18%",
        predicted: "10.3 min",
        baseline: "12.6 min",
      },
      rwt: {
        improvement: "24%",
        predicted: "2.4 min",
        baseline: "3.2 min",
      },
      timeSaved: "~42 hrs/wk",
      timeSavedNote: "Based on 90-day avg volume",
      confidence: {
        score: "80-100%",
        level: "high",
        detail: "Strong patterns • 12,450 tickets",
      },
    },
  },
  2: {
    // Support queue
    tickets: "8,320",
    days: "60",
    agents: "18",
    skills: "4",
    results: {
      aht: {
        improvement: "15%",
        predicted: "8.5 min",
        baseline: "10.0 min",
      },
      rwt: {
        improvement: "20%",
        predicted: "2.8 min",
        baseline: "3.5 min",
      },
      timeSaved: "~35 hrs/wk",
      timeSavedNote: "Based on 60-day avg volume",
      confidence: {
        score: "50-79%",
        level: "medium",
        detail: "Moderate patterns • 8,320 tickets",
      },
    },
  },
  3: {
    // Sales queue
    tickets: "5,890",
    days: "45",
    agents: "12",
    skills: "3",
    results: {
      aht: {
        improvement: "12%",
        predicted: "7.0 min",
        baseline: "8.0 min",
      },
      rwt: {
        improvement: "18%",
        predicted: "3.0 min",
        baseline: "3.7 min",
      },
      timeSaved: "~28 hrs/wk",
      timeSavedNote: "Based on 45-day avg volume",
      confidence: {
        score: "50-79%",
        level: "medium",
        detail: "Moderate patterns • 5,890 tickets",
      },
    },
  },
  4: {
    // Technical queue
    tickets: "15,720",
    days: "120",
    agents: "32",
    skills: "8",
    results: {
      aht: {
        improvement: "22%",
        predicted: "12.5 min",
        baseline: "16.0 min",
      },
      rwt: {
        improvement: "28%",
        predicted: "2.0 min",
        baseline: "2.8 min",
      },
      timeSaved: "~58 hrs/wk",
      timeSavedNote: "Based on 120-day avg volume",
      confidence: {
        score: "80-100%",
        level: "high",
        detail: "Strong patterns • 15,720 tickets",
      },
    },
  },
  5: {
    // Returns queue
    tickets: "3,450",
    days: "30",
    agents: "8",
    skills: "2",
    results: {
      aht: {
        improvement: "8%",
        predicted: "5.5 min",
        baseline: "6.0 min",
      },
      rwt: {
        improvement: "12%",
        predicted: "3.5 min",
        baseline: "4.0 min",
      },
      timeSaved: "~15 hrs/wk",
      timeSavedNote: "Based on 30-day avg volume",
      confidence: {
        score: "20-49%",
        level: "low",
        detail: "Weak patterns • 3,450 tickets",
      },
    },
  },
  default: {
    tickets: "10,000",
    days: "90",
    agents: "20",
    skills: "5",
    results: {
      aht: {
        improvement: "16%",
        predicted: "9.0 min",
        baseline: "10.7 min",
      },
      rwt: {
        improvement: "21%",
        predicted: "2.6 min",
        baseline: "3.3 min",
      },
      timeSaved: "~38 hrs/wk",
      timeSavedNote: "Based on 90-day avg volume",
      confidence: {
        score: "50-79%",
        level: "medium",
        detail: "Moderate patterns • 10,000 tickets",
      },
    },
  },
};

// Get evaluation results for a specific queue
const getEvaluationResults = (queueId) => {
  const data = QUEUE_EVALUATION_DATA[queueId] || QUEUE_EVALUATION_DATA.default;
  return data.results;
};

// Get evaluation steps for a specific queue
const getEvaluationSteps = (queueId) => {
  const data = QUEUE_EVALUATION_DATA[queueId] || QUEUE_EVALUATION_DATA.default;
  return [
    {
      id: 1,
      textBefore: "Collected ",
      boldText: `${data.tickets} tickets`,
      textAfter: " from the last ",
      boldText2: `${data.days} days`,
    },
    {
      id: 2,
      textBefore: "Identified ",
      boldText: `${data.agents} agents`,
      textAfter: " and ",
      boldText2: `${data.skills} skills`,
    },
    { id: 3, text: "Analyzing routing patterns and resolution times..." },
    { id: 4, text: "Simulating Predictive routing scenarios" },
    { id: 5, text: "Comparing potential performance gains" },
    { id: 6, text: "Packaging your results" },
  ];
};

// Metrics card component for results view
function MetricsCard({ type, data }) {
  const isAhtOrRwt = type === "aht" || type === "rwt";
  const isTts = type === "tts";
  const isConfidence = type === "confidence";

  const getLabel = () => {
    switch (type) {
      case "aht":
        return "Agent handle time";
      case "rwt":
        return "Requester wait time";
      case "tts":
        return "Estimated time saved";
      case "confidence":
        return "Confidence score";
      default:
        return "";
    }
  };

  const getConfidenceColorClass = (level) => {
    switch (level) {
      case "high":
        return "queue-eval-results__metric-value--success";
      case "medium":
        return "queue-eval-results__metric-value--warning";
      case "low":
      case "insufficient":
        return "queue-eval-results__metric-value--danger";
      default:
        return "queue-eval-results__metric-value--success";
    }
  };

  const getConfidenceLabel = (level) => {
    switch (level) {
      case "high":
        return "High";
      case "medium":
        return "Medium";
      case "low":
        return "Low";
      case "insufficient":
        return "Insufficient";
      default:
        return "";
    }
  };

  return (
    <div className="queue-eval-results__metric-card">
      <div className="queue-eval-results__metric-header">
        <MetricsInfoIcon className="queue-eval-results__metric-info-icon" />
        <span className="queue-eval-results__metric-label">{getLabel()}</span>
      </div>
      <div className="queue-eval-results__metric-content">
        <div className="queue-eval-results__metric-value-row">
          {isAhtOrRwt && (
            <>
              <MetricsChevronDownIcon className="queue-eval-results__metric-chevron" />
              <span className="queue-eval-results__metric-value queue-eval-results__metric-value--success">
                {data.improvement}
              </span>
              <span className="queue-eval-results__metric-detail">
                {data.predicted} predicted
              </span>
            </>
          )}
          {isTts && (
            <>
              <span className="queue-eval-results__metric-value queue-eval-results__metric-value--success">
                {data.timeSaved}
              </span>
              <span className="queue-eval-results__metric-detail">
                {data.timeSavedNote}
              </span>
            </>
          )}
          {isConfidence && (
            <>
              <span
                className={`queue-eval-results__metric-value ${getConfidenceColorClass(data.confidence.level)}`}
              >
                {data.confidence.score}
              </span>
              <span className="queue-eval-results__metric-detail">
                {getConfidenceLabel(data.confidence.level)}
              </span>
            </>
          )}
        </div>
        {isAhtOrRwt && (
          <div className="queue-eval-results__metric-baseline">
            vs. {data.baseline} (90-day avg)
          </div>
        )}
        {isConfidence && (
          <div className="queue-eval-results__metric-baseline">
            {data.confidence.detail}
          </div>
        )}
      </div>
    </div>
  );
}

// Results view component
function QueueEvaluationResults({
  queue,
  results,
  onEnablePredictive,
  onKeepInitial,
  onDismiss,
}) {
  return (
    <div className="queue-eval-results">
      {/* Header */}
      <div className="queue-eval-results__header">
        <h2 className="queue-eval-results__title">Queue evaluation results</h2>
        <p className="queue-eval-results__subtitle">
          Based on your <strong>{queue.name}</strong> queue data, Predictive
          routing could significantly improve efficiency.
        </p>
      </div>

      {/* Metrics Cards */}
      <div className="queue-eval-results__metrics">
        <MetricsCard type="aht" data={results.aht} />
        <MetricsCard type="rwt" data={results.rwt} />
        <MetricsCard
          type="tts"
          data={{
            timeSaved: results.timeSaved,
            timeSavedNote: results.timeSavedNote,
          }}
        />
        <MetricsCard type="confidence" data={results} />
      </div>

      {/* Disclaimer */}
      <p className="queue-eval-results__disclaimer">
        Evaluation results are based on simulated data. Actual performance may
        vary once Predictive routing is live.
      </p>

      {/* Divider */}
      <div className="queue-eval-results__divider" />

      {/* Recommendation Section */}
      <div className="queue-eval-results__recommendation">
        <h3 className="queue-eval-results__recommendation-title">
          Recommended next steps
        </h3>
        <p className="queue-eval-results__recommendation-text">
          Results look promising. Apply Predictive routing to the entire queue,
          or keep Initial routing. You can change this at any time.
        </p>
      </div>

      {/* Action Buttons */}
      <div className="queue-eval-results__actions">
        <Button
          isPrimary
          className="queue-eval-results__btn"
          onClick={onEnablePredictive}
        >
          Turn on Predictive routing
        </Button>
        <Button className="queue-eval-results__btn" onClick={onKeepInitial}>
          Keep Initial routing
        </Button>
        <Button
          isBasic
          isDanger
          className="queue-eval-results__btn"
          onClick={onDismiss}
        >
          Dismiss results
        </Button>
      </div>
    </div>
  );
}

// Rocket icon for enabled state - matches Figma node I256:7282
function RocketIcon({ className }) {
  return (
    <img
      className={className}
      src={assetUrl("/assets/Rocket-ad39e3fa-c92b-4207-a15a-c01e01d35d5c.png")}
      alt=""
      width="40"
      height="40"
    />
  );
}

// Enabled state content component - shown after predictive routing is enabled
// Matches Figma design: node-id=256-7275 (Turn On state)
function QueueEvaluationEnabled({ queue, onClose }) {
  return (
    <div className="queue-eval-enabled">
      {/* Header section with rocket icon and title - matches Figma */}
      <div className="queue-eval-enabled__header">
        <RocketIcon className="queue-eval-enabled__icon" />
        <h2 className="queue-eval-enabled__title">
          Predictive routing is live
        </h2>
        <p className="queue-eval-enabled__subtitle">
          You turned on Predictive routing for the <strong>{queue.name}</strong>{" "}
          queue. Tickets are now being matched to the best-equipped agents.
        </p>
      </div>

      {/* What to expect section - matches Figma bullet list */}
      <div className="queue-eval-enabled__expectations">
        <p className="queue-eval-enabled__expectations-title">
          What to expect:
        </p>
        <ul className="queue-eval-enabled__expectations-list">
          <li>Shorter wait times for requesters</li>
          <li>Faster ticket resolutions</li>
          <li>More efficient agent workload distribution</li>
        </ul>
      </div>

      {/* Action button - green Done button matching Figma */}
      <div className="queue-eval-enabled__actions">
        <Button isPrimary className="queue-eval-enabled__btn" onClick={onClose}>
          Done
        </Button>
      </div>
    </div>
  );
}

// External link icon for dashboard buttons
function ExternalLinkSmallIcon({ className }) {
  return (
    <svg
      className={className}
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M9 6.5V9.5C9 9.76522 8.89464 10.0196 8.70711 10.2071C8.51957 10.3946 8.26522 10.5 8 10.5H2.5C2.23478 10.5 1.98043 10.3946 1.79289 10.2071C1.60536 10.0196 1.5 9.76522 1.5 9.5V4C1.5 3.73478 1.60536 3.48043 1.79289 3.29289C1.98043 3.10536 2.23478 3 2.5 3H5.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M7.5 1.5H10.5V4.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M5 7L10.5 1.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// Performance metrics card component
function PerformanceMetricsCard({ type, data }) {
  const isAht = type === "aht";
  const isRwt = type === "rwt";
  const isTts = type === "tts";

  const getLabel = () => {
    switch (type) {
      case "aht":
        return "Agent handle time";
      case "rwt":
        return "Requester wait time";
      case "tts":
        return "Total time saved";
      default:
        return "";
    }
  };

  return (
    <div className="queue-performance__metric-card">
      <div className="queue-performance__metric-header">
        <MetricsInfoIcon className="queue-performance__metric-info-icon" />
        <span className="queue-performance__metric-label">{getLabel()}</span>
      </div>
      <div className="queue-performance__metric-content">
        {(isAht || isRwt) && (
          <>
            <div className="queue-performance__metric-value-row">
              <MetricsChevronDownIcon className="queue-performance__metric-chevron" />
              <span className="queue-performance__metric-value queue-performance__metric-value--success">
                {data.improvement}
              </span>
              <span className="queue-performance__metric-detail">
                {data.predicted}
              </span>
            </div>
            <div className="queue-performance__metric-baseline">
              vs. {data.baseline} (90-day avg)
            </div>
          </>
        )}
        {isTts && (
          <div className="queue-performance__metric-value-row">
            <span className="queue-performance__metric-value queue-performance__metric-value--success queue-performance__metric-value--large">
              {data.timeSaved}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

// Performance view component - shown when clicking on a queue with Predictive routing enabled
function QueuePerformanceView({ queue, results, onClose }) {
  return (
    <div className="queue-performance">
      {/* Subtitle */}
      <p className="queue-performance__subtitle">
        Your <strong>{queue.name}</strong> queue is up and running using
        Predictive routing.
      </p>

      {/* Metrics Cards */}
      <div className="queue-performance__metrics">
        <PerformanceMetricsCard type="aht" data={results.aht} />
        <PerformanceMetricsCard type="rwt" data={results.rwt} />
        <PerformanceMetricsCard
          type="tts"
          data={{ timeSaved: results.timeSaved }}
        />
      </div>

      {/* Data dashboards section */}
      <div className="queue-performance__dashboards">
        <h3 className="queue-performance__dashboards-title">Data dashboards</h3>
        <p className="queue-performance__dashboards-text">
          View dashboards to see how Predictive routing is performing.
        </p>
        <div className="queue-performance__dashboards-actions">
          <Button className="queue-performance__dashboard-btn">
            Go to ticket dashboard
            <ExternalLinkSmallIcon className="queue-performance__dashboard-btn-icon" />
          </Button>
          <Button className="queue-performance__dashboard-btn">
            Go to agent dashboard
            <ExternalLinkSmallIcon className="queue-performance__dashboard-btn-icon" />
          </Button>
        </div>
      </div>
    </div>
  );
}

// Analyzing state content component
function QueueEvaluationAnalyzing({ queue, progress, setProgress }) {
  const [isExpanded, setIsExpanded] = useState(true);

  // Simulation effect - progress through steps
  useEffect(() => {
    if (progress.currentStep >= progress.totalSteps) return;

    // Start with step 0, then progress
    const stepDurations = [1500, 1500, 2500, 2000, 2000, 2000]; // ms per step
    const currentDuration = stepDurations[progress.currentStep] || 2000;

    const timer = setTimeout(() => {
      setProgress((prev) => ({
        ...prev,
        // Mark current step as completed and move to next step
        completedSteps: prev.currentStep + 1,
        currentStep: prev.currentStep + 1,
      }));
    }, currentDuration);

    return () => clearTimeout(timer);
  }, [progress.currentStep, progress.totalSteps, setProgress]);

  const getStepStatus = (stepIndex) => {
    if (stepIndex < progress.completedSteps) return "completed";
    if (stepIndex === progress.currentStep) return "active";
    return "pending";
  };

  const renderStepText = (step, status) => {
    const textClass =
      status === "pending" ? "queue-eval-analyzing__step-text--pending" : "";

    if (step.boldText) {
      return (
        <span className={`queue-eval-analyzing__step-text ${textClass}`}>
          {step.textBefore}
          <strong>{step.boldText}</strong>
          {step.textAfter}
          {step.boldText2 && <strong>{step.boldText2}</strong>}
        </span>
      );
    }
    return (
      <span className={`queue-eval-analyzing__step-text ${textClass}`}>
        {step.text}
      </span>
    );
  };

  return (
    <>
      {/* Header section with title and subtitle */}
      <div className="queue-eval-analyzing__header">
        <SparkleHeaderIcon className="queue-eval-analyzing__sparkle-icon" />
        <h2 className="queue-eval-analyzing__title">
          Evaluating {queue.name} queue...
        </h2>
        <p className="queue-eval-analyzing__subtitle">
          Queue evaluation could take up to 60 minutes. You&apos;ll receive an
          email when results are ready.
        </p>
      </div>

      {/* Analysis card */}
      <div className="queue-eval-analyzing__card">
        <div className="queue-eval-analyzing__card-header">
          <SparkleAnalyzingIcon className="queue-eval-analyzing__card-icon" />
          <span className="queue-eval-analyzing__card-title">
            Analyzing your account data...
          </span>
        </div>

        {/* Collapsible section */}
        <div className="queue-eval-analyzing__progress-section">
          <button
            type="button"
            className="queue-eval-analyzing__toggle"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            <ChevronUpIcon
              className={`queue-eval-analyzing__toggle-icon ${!isExpanded ? "queue-eval-analyzing__toggle-icon--collapsed" : ""}`}
            />
            <span className="queue-eval-analyzing__toggle-text">
              {progress.completedSteps} of {progress.totalSteps} to-dos
              completed
            </span>
          </button>

          {isExpanded && (
            <div className="queue-eval-analyzing__steps">
              {getEvaluationSteps(queue.id).map((step, index) => {
                const status = getStepStatus(index);
                return (
                  <div
                    key={step.id}
                    className={`queue-eval-analyzing__step queue-eval-analyzing__step--${status}`}
                  >
                    <span className="queue-eval-analyzing__step-indicator">
                      {status === "completed" && "✓"}
                      {status === "active" && "◉"}
                      {status === "pending" && "◯"}
                    </span>
                    {renderStepText(step, status)}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

function QueueEvaluationPanel({
  queue,
  onClose,
  phase,
  progress,
  onBeginEvaluation,
  setEvaluationProgress,
  onEnablePredictive,
  onKeepInitial,
  onDismiss,
  onCloseEnabled,
}) {
  const [sidebarWidth, setSidebarWidth] = useState(380);
  const [isResizing, setIsResizing] = useState(false);
  const sidebarRef = useRef(null);

  // Handle resize drag
  useEffect(() => {
    if (!isResizing) return;

    const handleMouseMove = (e) => {
      if (!sidebarRef.current) return;

      const sidebarRect = sidebarRef.current.getBoundingClientRect();
      const newWidth = sidebarRect.right - e.clientX;

      // Set min and max width constraints
      const minWidth = 320;
      const maxWidth = 600;
      const constrainedWidth = Math.max(minWidth, Math.min(maxWidth, newWidth));

      setSidebarWidth(constrainedWidth);
    };

    const handleMouseUp = () => {
      setIsResizing(false);
      document.body.style.cursor = "";
      document.body.style.userSelect = "";
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);

    document.body.style.cursor = "ew-resize";
    document.body.style.userSelect = "none";

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
      document.body.style.cursor = "";
      document.body.style.userSelect = "";
    };
  }, [isResizing]);

  const handleResizeStart = (e) => {
    e.preventDefault();
    setIsResizing(true);
  };

  if (!queue) {
    return null;
  }

  const isAnalyzing = phase === "analyzing";
  const isResults = phase === "results";
  const isEnabled = phase === "enabled";
  const isPerformance = phase === "performance";

  // Get results data for this queue
  const results = getEvaluationResults(queue.id);

  return (
    <aside
      ref={sidebarRef}
      className={`queue-evaluation-sidebar ${isResults ? "queue-evaluation-sidebar--results" : ""} ${isEnabled ? "queue-evaluation-sidebar--enabled" : ""} ${isPerformance ? "queue-evaluation-sidebar--performance" : ""} ${isResizing ? "queue-evaluation-sidebar--resizing" : ""}`}
      style={{ width: `${sidebarWidth}px` }}
      aria-label="Queue evaluation sidebar"
    >
      <div
        className="queue-evaluation-sidebar__resize-handle"
        onMouseDown={handleResizeStart}
        aria-label="Resize sidebar"
      />
      <div className="queue-evaluation-sidebar__shell">
        {/* Header with title for results view */}
        {isResults && (
          <div className="queue-evaluation-sidebar__results-header">
            <h2 className="queue-evaluation-sidebar__results-title">
              Queue evaluation results
            </h2>
            <button
              type="button"
              className="queue-evaluation-sidebar__close queue-evaluation-sidebar__close--inline"
              aria-label="Close queue evaluation sidebar"
              onClick={onClose}
            >
              <PromoCloseIcon className="queue-evaluation-sidebar__close-icon" />
            </button>
          </div>
        )}

        {/* Header with empty label for enabled view - matches Figma Turn On state */}
        {isEnabled && (
          <div className="queue-evaluation-sidebar__header-minimal">
            <button
              type="button"
              className="queue-evaluation-sidebar__close queue-evaluation-sidebar__close--right"
              aria-label="Close queue evaluation sidebar"
              onClick={onCloseEnabled}
            >
              <PromoCloseIcon className="queue-evaluation-sidebar__close-icon" />
            </button>
          </div>
        )}

        {/* Header with title for performance view */}
        {isPerformance && (
          <div className="queue-evaluation-sidebar__results-header">
            <h2 className="queue-evaluation-sidebar__results-title">
              {queue.name} queue performance
            </h2>
            <button
              type="button"
              className="queue-evaluation-sidebar__close queue-evaluation-sidebar__close--inline"
              aria-label="Close queue evaluation sidebar"
              onClick={onClose}
            >
              <PromoCloseIcon className="queue-evaluation-sidebar__close-icon" />
            </button>
          </div>
        )}

        {/* Close button for non-results, non-enabled, and non-performance views */}
        {!isResults && !isEnabled && !isPerformance && (
          <button
            type="button"
            className="queue-evaluation-sidebar__close"
            aria-label="Close queue evaluation sidebar"
            onClick={onClose}
          >
            <PromoCloseIcon className="queue-evaluation-sidebar__close-icon" />
          </button>
        )}

        {/* Main content */}
        <div
          className={`queue-evaluation-sidebar__content ${isResults ? "queue-evaluation-sidebar__content--results" : ""} ${isEnabled ? "queue-evaluation-sidebar__content--enabled" : ""} ${isPerformance ? "queue-evaluation-sidebar__content--performance" : ""}`}
        >
          {isPerformance ? (
            <QueuePerformanceView
              queue={queue}
              results={results}
              onClose={onClose}
            />
          ) : isEnabled ? (
            <QueueEvaluationEnabled queue={queue} onClose={onCloseEnabled} />
          ) : isResults ? (
            <QueueEvaluationResults
              queue={queue}
              results={results}
              onEnablePredictive={onEnablePredictive}
              onKeepInitial={onKeepInitial}
              onDismiss={onDismiss}
            />
          ) : isAnalyzing ? (
            <QueueEvaluationAnalyzing
              queue={queue}
              progress={progress}
              setProgress={setEvaluationProgress}
            />
          ) : (
            <div className="queue-evaluation-sidebar__welcome">
              <BookOpenIcon className="queue-evaluation-sidebar__book-icon" />
              <h2 className="queue-evaluation-sidebar__title">
                Evaluate, review, decide
              </h2>
              <div className="queue-evaluation-sidebar__description">
                <p>
                  Test Predictive routing on this queue. You&apos;ll choose what
                  to do with the results.
                </p>
                <ul>
                  <li>Turn on Predictive routing</li>
                  <li>Keep Initial routing</li>
                </ul>
                <p>Takes a few minutes. You&apos;ll be notified when ready.</p>
              </div>
              <Button
                isPrimary
                className="queue-evaluation-sidebar__cta"
                onClick={onBeginEvaluation}
              >
                Evaluate {queue.name} queue
              </Button>
            </div>
          )}
        </div>

        {/* Footer disclaimer - show for intro and analyzing views */}
        {!isResults && !isEnabled && !isPerformance && (
          <div className="queue-evaluation-sidebar__disclaimer">
            <span className="queue-evaluation-sidebar__disclaimer-title">
              Powered by AI
            </span>
            <p className="queue-evaluation-sidebar__disclaimer-text">
              Evaluation results are based on simulated data. Actual performance
              may vary once Predictive routing is live.
            </p>
          </div>
        )}

        {/* Footer for enabled state - matches Figma */}
        {isEnabled && (
          <div className="queue-evaluation-sidebar__disclaimer queue-evaluation-sidebar__disclaimer--enabled">
            <p className="queue-evaluation-sidebar__disclaimer-text">
              You can change this setting anytime in the queue configuration.
            </p>
          </div>
        )}
      </div>
    </aside>
  );
}

// ─── Recommendations Drawer ───────────────────────────────────────────────────

function SparkleFeatureIcon({ className }) {
  return (
    <svg
      className={className}
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M8 1.5L8.73 5.51L12 4L9.83 7.27L14 8L9.83 8.73L12 12L8.73 10.49L8 14.5L7.27 10.49L4 12L6.17 8.73L2 8L6.17 7.27L4 4L7.27 5.51L8 1.5Z"
        fill="currentColor"
      />
    </svg>
  );
}

function FlowFeatureIcon({ className }) {
  return (
    <svg
      className={className}
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M8.00016 1C7.17936 1 6.51221 1.63364 6.44597 2.43973C5.38913 2.87981 4.56163 3.75905 4.19933 4.85323C4.12406 5.08112 4.2497 5.32667 4.47759 5.40194C4.70547 5.47721 4.9511 5.35157 5.02638 5.12369C5.29427 4.32295 5.8898 3.67736 6.64046 3.31196C6.90629 3.78605 7.41553 4.10834 8.00016 4.10834C8.84388 4.10834 9.52516 3.42706 9.52516 2.58334C9.52516 1.73962 8.84388 1 8.00016 1Z"
        fill="currentColor"
      />
      <path
        d="M11.0636 3.81772C10.9021 3.63406 10.6271 3.61437 10.4434 3.77584C10.2598 3.9373 10.2401 4.21231 10.4016 4.396C10.8767 4.93587 11.167 5.64189 11.167 6.41672C11.167 6.49193 11.1644 6.5667 11.1594 6.64089C10.6104 6.63196 10.0789 6.90706 9.7964 7.40454C9.36596 8.15516 9.61597 9.10527 10.3666 9.5357C11.1172 9.96613 12.0673 9.71611 12.4977 8.96549C12.8969 8.26885 12.6902 7.39737 12.0554 6.94671C12.0768 6.77234 12.0836 6.5949 12.0836 6.41672C12.0836 5.41321 11.7355 4.49346 11.0636 3.81772Z"
        fill="currentColor"
      />
      <path
        d="M4.40053 7.40449C3.97009 6.65386 3.01997 6.40385 2.26935 6.83428C1.51872 7.26471 1.26871 8.21483 1.69914 8.96545C2.09982 9.66255 3.00368 9.93775 3.74473 9.56698C4.43535 10.0804 5.29136 10.3889 6.21682 10.3889C6.47657 10.3889 6.73173 10.3652 6.97952 10.3196C7.21669 10.2753 7.37219 10.0469 7.32783 9.80972C7.28348 9.57251 7.05506 9.41705 6.81789 9.46141C6.62713 9.49746 6.43017 9.51672 6.21682 9.51672C5.55284 9.51672 4.93431 9.31616 4.42138 8.96471C4.70153 8.50956 4.72636 7.91819 4.40053 7.40449Z"
        fill="currentColor"
      />
    </svg>
  );
}

function RocketFeatureIcon({ className }) {
  return (
    <svg
      className={className}
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M8 1.5C7.33333 1.5 6.5 2.5 6 4C5.5 5.5 5.5 7 5.5 7L9 7C9 7 9 5.5 8.5 4C8 2.5 8.66667 1.5 8 1.5Z"
        fill="currentColor"
      />
      <path
        d="M5.5 7C5.5 7 4 7.5 3 9C2 10.5 2 12 2 12H5.5V7Z"
        fill="currentColor"
      />
      <path
        d="M9 7V12H12.5C12.5 12 12.5 10.5 11.5 9C10.5 7.5 9 7 9 7Z"
        fill="currentColor"
      />
      <path d="M5.5 12H9V14.5H5.5V12Z" fill="currentColor" />
    </svg>
  );
}

const INITIAL_RECOMMENDATIONS = [
  {
    id: "predictive-routing",
    title: "Activate predictive routing for remaining queues",
    subtitle: "Agent handle time could improve by 22%",
    featureColor: "#f7e6f1",
    featureTextColor: "#8b3f7a",
    FeatureIcon: SparkleFeatureIcon,
    tag: "Optimization",
    rationale: null, // computed from inactiveQueues.length at render time
    showQueues: true,
    supportingInsightsType: "widgets",
    supportingInsightsContent: [
      {
        label: "Agent handle time",
        value: "22%",
        trendDirection: "down",
        valueVariant: "success",
        annotation: "11.1 min predicted",
        footnote: "vs. 14.2 min (30-day avg)",
      },
      {
        label: "Requester wait time",
        value: "24%",
        trendDirection: "down",
        valueVariant: "success",
        annotation: "2.4 min predicted",
        footnote: "vs. 3.2 min (30-day avg)",
      },
      {
        label: "Estimated time saved",
        value: "~42 hrs/wk",
        valueVariant: "success",
        annotation: "Based on 30-day avg volume",
      },
      {
        label: "Confidence score",
        value: "92%",
        valueVariant: "success",
        annotation: "High",
        footnote: "Strong patterns • 48,200 tickets",
      },
    ],
    nextStepsType: "bullets",
    nextStepsContent: [
      "Predictive routing will be activated for VIP / Escalations, Refunds & Returns, and Onboarding & Activation queues immediately.",
      "No changes to groups or priority. Primary and secondary group assignments, queue priority, and SLA policies will remain as configured.",
    ],
    ctaLabel: "Apply recommendation",
  },
  {
    id: "skills-based",
    title: "Activate Skills-Based routing",
    subtitle: "Assignment quality and CSAT could improve",
    featureColor: "#e7e9f8",
    featureTextColor: "#3b44a9",
    FeatureIcon: FlowFeatureIcon,
    tag: "Automation",
    rationale:
      "We've identified patterns in your routing data that suggest skills-based routing would significantly improve your assignment quality and overall CSAT.",
    showQueues: false,
    supportingInsightsType: "bullets",
    supportingInsightsContent: {
      items: [
        [
          { bold: true, text: "34%" },
          {
            text: " of tickets are reassigned at least once before resolution",
          },
        ],
        [
          { text: "Tickets assigned to non-specialist agents score " },
          { bold: true, text: "18 pts" },
          { text: " lower in " },
          { bold: true, text: "CSAT" },
        ],
        [
          { bold: true, text: "22%" },
          {
            text: " of Tier 1 tickets escalate to the same 5 agents in Tier 2",
          },
        ],
        [
          { text: "We detected 6 distinct ticket intent clusters with " },
          { bold: true, text: ">90%" },
          { text: " classification confidence" },
        ],
      ],
      link: "View related tickets",
    },
    nextStepsType: "bullets",
    nextStepsContent: [
      "We will analyze historical assignments to understand who handled what",
      "We will analyze agent performance to find each agent's strengths",
      "We will classify ticket intents to define meaningful skills",
      "We will generate a skills matrix mapping agents to skills",
      "You review and adjust before anything goes live",
    ],
    nextStepsLink: "Learn about skill-based routing",
    ctaLabel: "Apply recommendation",
  },
  {
    id: "wfm-data",
    title: "Integrate Workforce Management data",
    subtitle: "Schedule adherence could improve by up to 39%",
    featureGradient: "linear-gradient(87deg, #eef8f4 8.88%, #d9ecfc 100%)",
    featureTextColor: "#186146",
    FeatureIcon: RocketFeatureIcon,
    tag: "Automation",
    rationale:
      "We've identified significant gaps between agent scheduled activities and their actual routing status. Syncing your WFM schedule with Omnichannel Routing would reduce idle time, improve adherence, and ensure the right agents are available in the right queues at the right times.",
    showQueues: false,
    supportingInsightsType: "bullets",
    supportingInsightsContent: {
      items: [
        [
          { bold: true, text: "Schedule adherence rate: 61%" },
          {
            text: " — agents are active outside their scheduled windows 39% of the time.",
          },
        ],
        [
          { bold: true, text: "3.2 hrs/day average idle time" },
          {
            text: " per agent during scheduled online hours across your top 5 queues.",
          },
        ],
        [
          { bold: true, text: "14 understaffed intervals per week" },
          { text: " concentrated between 9–11 AM, when ticket volume peaks." },
        ],
        [
          { bold: true, text: "Avg 4.7 min delay" },
          {
            text: " between a scheduled status change and the agent's actual status update in Agent Workspace.",
          },
        ],
      ],
      link: "View adherence report",
    },
    nextStepsType: "numbered",
    nextStepsContent: [
      {
        heading: "Sync agent schedules to routing",
        body: "Agents will be automatically assigned to the correct queue based on their WFM schedule. No manual moves needed.",
      },
      {
        heading: "Auto-update agent status",
        body: "Agent status in Agent Workspace will change automatically when their scheduled activity changes — Online, Away, Break, Focus.",
      },
      {
        heading: "Enforce break windows",
        body: "Agents will be set to Away during scheduled breaks and returned to Online when the break ends.",
      },
      {
        heading: "Enable overflow handling",
        body: "If a queue is understaffed relative to the schedule, eligible agents from secondary groups will be automatically pulled in.",
      },
    ],
    ctaLabel: "Activate integration",
  },
];

export default function QueuesPage({
  onProductChange,
  selectedProduct,
  products,
  onSubPageChange,
  appliedRecommendationIds,
  onRecommendationApplied,
}) {
  const [searchQuery, setSearchQuery] = useState("");
  const [isNavCollapsed, setIsNavCollapsed] = useState(false);
  const [queues, setQueues] = useLocalStorage("zenbox:queues", sampleQueues);
  const [selectedQueue, setSelectedQueue] = useState(null);
  const [isCreating, setIsCreating] = useState(false);
  const [evaluatingQueue, setEvaluatingQueue] = useState(null);
  const [isRecommendationsOpen, setIsRecommendationsOpen] = useState(false);
  const [selectedRecommendation, setSelectedRecommendation] = useState(null);
  const [showNotification, setShowNotification] = useState(false);
  const [recommendations, setRecommendations] = useState(() =>
    appliedRecommendationIds
      ? INITIAL_RECOMMENDATIONS.filter(
          (r) => !appliedRecommendationIds.has(r.id),
        )
      : INITIAL_RECOMMENDATIONS,
  );
  const [isCopilotOpen, setIsCopilotOpen] = useState(false);

  // Track all queues that are currently being evaluated (persists after closing sidebar)
  const [queuesInEvaluation, setQueuesInEvaluation] = useState(new Set());

  // Track all queues that have completed evaluation and have results ready
  const [queuesWithResults, setQueuesWithResults] = useState(new Set());

  // Evaluation state management
  const [evaluationPhase, setEvaluationPhase] = useState("intro"); // 'intro' | 'analyzing' | 'results'
  const [evaluationProgress, setEvaluationProgress] = useState({
    completedSteps: 0,
    totalSteps: 6,
    currentStep: 0,
  });

  // Effect to detect when evaluation completes and transition to results
  useEffect(() => {
    if (
      evaluationProgress.currentStep >= evaluationProgress.totalSteps &&
      evaluatingQueue
    ) {
      // Evaluation completed - transition to results phase
      const queueId = evaluatingQueue.id;

      // Remove from evaluating, add to results
      setQueuesInEvaluation((prev) => {
        const newSet = new Set(prev);
        newSet.delete(queueId);
        return newSet;
      });
      setQueuesWithResults((prev) => new Set([...prev, queueId]));
      setEvaluationPhase("results");
    }
  }, [
    evaluationProgress.currentStep,
    evaluationProgress.totalSteps,
    evaluatingQueue,
  ]);

  const handleToggleNav = () => {
    setIsNavCollapsed(!isNavCollapsed);
  };

  const handleToggleCopilot = () => {
    if (!isCopilotOpen) {
      setEvaluatingQueue(null);
      setIsRecommendationsOpen(false);
      setSelectedRecommendation(null);
    }
    setIsCopilotOpen((prev) => !prev);
  };

  const handleOpenRecommendations = () => {
    setIsCopilotOpen(false);
    setIsRecommendationsOpen(true);
  };

  const handleReorderQueues = (fromIndex, toIndex) => {
    setQueues((prevQueues) => {
      const newQueues = [...prevQueues];
      const [movedItem] = newQueues.splice(fromIndex, 1);
      newQueues.splice(toIndex, 0, movedItem);
      return newQueues;
    });
  };

  const handleQueueSelect = (queue) => {
    setSelectedQueue(queue);
  };

  const handleCreateQueue = (prefillData = {}) => {
    setSelectedQueue({
      id: null,
      isNew: true,
      name: prefillData.name || "",
      description: prefillData.description || "",
      subqueue: null,
      priority: {
        main: prefillData.priority || "1",
        more: 0,
        items: [prefillData.priority || "1"],
      },
      primaryGroups: {
        main: "",
        more: 0,
        items: prefillData.primaryGroups || [],
      },
      secondaryGroups: {
        main: "",
        more: 0,
        items: prefillData.secondaryGroups || [],
      },
      assignmentMethod: "Initial routing configuration",
      conditions: { all: [], any: [] },
      distributeSubqueues: false,
      ...prefillData,
    });
    setIsCreating(true);
  };

  const handleCloneQueue = (queue) => {
    // Create a new queue with cloned data
    const clonedQueue = {
      ...queue,
      id: null,
      isNew: true,
      name: `${queue.name} (Copy)`,
    };
    setSelectedQueue(clonedQueue);
    setIsCreating(true);
  };

  const handleDeleteQueue = (queueId) => {
    // Remove queue from the list
    setQueues((prevQueues) => prevQueues.filter((q) => q.id !== queueId));

    // Clean up evaluation states
    setQueuesInEvaluation((prev) => {
      const newSet = new Set(prev);
      newSet.delete(queueId);
      return newSet;
    });

    setQueuesWithResults((prev) => {
      const newSet = new Set(prev);
      newSet.delete(queueId);
      return newSet;
    });
  };

  const handleBackToList = () => {
    setSelectedQueue(null);
    setIsCreating(false);
  };

  const handleSaveQueue = (updatedQueue) => {
    if (isCreating) {
      // Generate a new unique ID for the queue
      const maxId = queues.reduce((max, q) => Math.max(max, q.id), 0);
      const newQueue = {
        ...updatedQueue,
        id: maxId + 1,
        isNew: undefined, // Remove the isNew flag
      };
      // Update display fields for the table
      if (newQueue.primaryGroups?.items?.length > 0) {
        newQueue.primaryGroups.main = newQueue.primaryGroups.items[0];
        newQueue.primaryGroups.more = Math.max(
          0,
          newQueue.primaryGroups.items.length - 1,
        );
      }
      if (newQueue.secondaryGroups?.items?.length > 0) {
        newQueue.secondaryGroups.main = newQueue.secondaryGroups.items[0];
        newQueue.secondaryGroups.more = Math.max(
          0,
          newQueue.secondaryGroups.items.length - 1,
        );
      }
      setQueues((prevQueues) => [...prevQueues, newQueue]);
      setIsCreating(false);
    } else {
      setQueues((prevQueues) =>
        prevQueues.map((q) => (q.id === updatedQueue.id ? updatedQueue : q)),
      );
    }
    setSelectedQueue(null);
  };

  const filteredQueues = queues.filter((queue) =>
    queue.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const handleStartQueueEvaluation = (queue) => {
    // Check if Predictive routing is already enabled for this queue
    const isPredictiveEnabled = queue.assignmentMethod === "Predictive routing";
    // Check if this queue has results ready
    const hasResults = queuesWithResults.has(queue.id);
    // Check if this queue is already being evaluated
    const isAlreadyEvaluating = queuesInEvaluation.has(queue.id);

    setEvaluatingQueue(queue);

    if (isPredictiveEnabled) {
      // Show performance metrics view
      setEvaluationPhase("performance");
    } else if (hasResults) {
      // Show results view
      setEvaluationPhase("results");
    } else if (isAlreadyEvaluating) {
      // Show analyzing state
      setEvaluationPhase("analyzing");
    } else {
      // Show intro state
      setEvaluationPhase("intro");
      setEvaluationProgress({
        completedSteps: 0,
        totalSteps: 6,
        currentStep: 0,
      });
    }
  };

  const handleCloseQueueEvaluation = () => {
    // Keep the evaluation running in background, just close the sidebar
    setEvaluatingQueue(null);
    // Don't reset phase or progress - evaluation continues in background
  };

  // Start the actual evaluation (triggered from sidebar CTA)
  const handleBeginEvaluation = () => {
    if (evaluatingQueue) {
      // Add this queue to the set of queues being evaluated
      setQueuesInEvaluation((prev) => new Set([...prev, evaluatingQueue.id]));
    }
    setEvaluationPhase("analyzing");
    setEvaluationProgress({
      completedSteps: 0,
      totalSteps: 6,
      currentStep: 0,
    });
  };

  // Enable Predictive routing for the queue
  const handleEnablePredictiveRouting = () => {
    if (evaluatingQueue) {
      // Update the queue's assignment method
      setQueues((prevQueues) =>
        prevQueues.map((q) =>
          q.id === evaluatingQueue.id
            ? { ...q, assignmentMethod: "Predictive routing" }
            : q,
        ),
      );
      // Remove from results set
      setQueuesWithResults((prev) => {
        const newSet = new Set(prev);
        newSet.delete(evaluatingQueue.id);
        return newSet;
      });
      // Show enabled state instead of closing
      setEvaluationPhase("enabled");
    }
  };

  // Keep Initial routing - just mark as resolved
  const handleKeepInitialRouting = () => {
    if (evaluatingQueue) {
      // Remove from results set (user has made a decision)
      setQueuesWithResults((prev) => {
        const newSet = new Set(prev);
        newSet.delete(evaluatingQueue.id);
        return newSet;
      });
      // Close sidebar
      setEvaluatingQueue(null);
      setEvaluationPhase("intro");
    }
  };

  // Dismiss results - remove from results set
  const handleDismissResults = () => {
    if (evaluatingQueue) {
      // Remove from results set
      setQueuesWithResults((prev) => {
        const newSet = new Set(prev);
        newSet.delete(evaluatingQueue.id);
        return newSet;
      });
      // Close sidebar
      setEvaluatingQueue(null);
      setEvaluationPhase("intro");
    }
  };

  // Close sidebar after enabling predictive routing (from enabled state)
  const handleCloseEnabledState = () => {
    setEvaluatingQueue(null);
    setEvaluationPhase("intro");
  };

  // Apply a recommendation
  const handleApplyRecommendation = () => {
    if (selectedRecommendation?.id === "wfm-data") {
      // WFM: navigate to Routing Config and trigger Copilot activation flow
      setRecommendations((prev) =>
        prev.filter((r) => r.id !== selectedRecommendation.id),
      );
      onRecommendationApplied?.("wfm-data");
      setIsRecommendationsOpen(false);
      setSelectedRecommendation(null);
      onSubPageChange("routing-config", { copilotFlow: "wfm-activation" });
      return;
    }

    if (selectedRecommendation?.id === "skills-based") {
      setRecommendations((prev) =>
        prev.filter((r) => r.id !== selectedRecommendation.id),
      );
      onRecommendationApplied?.("skills-based");
      setIsRecommendationsOpen(false);
      setSelectedRecommendation(null);
      onSubPageChange("skills", { copilotFlow: "skills-activation" });
      return;
    }

    // Default: activate predictive routing for all inactive queues
    setQueues((prev) =>
      prev.map((q) =>
        q.assignmentMethod !== "Predictive routing"
          ? { ...q, assignmentMethod: "Predictive routing" }
          : q,
      ),
    );
    if (selectedRecommendation) {
      setRecommendations((prev) =>
        prev.filter((r) => r.id !== selectedRecommendation.id),
      );
      onRecommendationApplied?.(selectedRecommendation.id);
    }
    setIsRecommendationsOpen(false);
    setSelectedRecommendation(null);
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 5000);
  };

  // Navigation column component to share with QueueEditPage
  const navColumn = (
    <PageSidebarNav
      primaryItems={primaryNavItems}
      secondaryHeading="Objects and rules"
      secondarySections={secondaryNavSections}
      activeItem="queues"
      onItemSelect={onSubPageChange}
      isCollapsed={isNavCollapsed}
      onToggleCollapse={handleToggleNav}
    />
  );

  // Show Queue Edit Page if a queue is selected
  if (selectedQueue) {
    return (
      <QueueEditPage
        queue={selectedQueue}
        isCreating={isCreating}
        onBack={handleBackToList}
        onSave={handleSaveQueue}
        navColumn={navColumn}
        selectedProduct={selectedProduct}
        products={products}
        onProductChange={onProductChange}
        isNavCollapsed={isNavCollapsed}
      />
    );
  }

  return (
    <div className="queues-page">
      <TopBar
        pageTitle="Omnichannel routing"
        selectedProduct={selectedProduct}
        products={products}
        onProductChange={onProductChange}
        isNavCollapsed={isNavCollapsed}
        isCopilotOpen={isCopilotOpen}
        onToggleCopilot={handleToggleCopilot}
      />
      <div className="queues-page__body">
        {/* Navigation Column */}
        {navColumn}

        {/* Content Column */}
        <div className="queues-page__content-column">
          <div className="queues-page__main-wrapper">
            <main className="queues-page__main">
              <div className="queues-page__content">
                {/* Breadcrumbs */}
                <div className="queues-breadcrumbs">
                  <Anchor href="#" className="queues-breadcrumbs__link">
                    Objects and rules
                  </Anchor>
                  <ChevronRightIcon className="queues-breadcrumbs__separator" />
                  <Anchor href="#" className="queues-breadcrumbs__link">
                    Omnichannel routing
                  </Anchor>
                  <ChevronRightIcon className="queues-breadcrumbs__separator" />
                  <span className="queues-breadcrumbs__current">Queues</span>
                </div>

                {/* Page Header */}
                <div className="queues-page-header">
                  <div className="queues-page-header__left">
                    <h1 className="queues-page-header__title">Queues</h1>
                    <div className="queues-page-header__description">
                      <p>
                        Queues give you the flexibility to prioritize tickets
                        across different groups.{" "}
                        <Anchor href="#" className="queues-page-header__link">
                          Learn about queues
                          <ExternalLinkIcon className="queues-page-header__link-icon" />
                        </Anchor>
                      </p>
                    </div>
                  </div>
                  <div className="queues-page-header__actions">
                    <Button onClick={() => {}}>Manage settings</Button>
                    <Button isPrimary onClick={() => handleCreateQueue()}>
                      Create queue
                    </Button>
                  </div>
                </div>

                {/* Recommendations Banner */}
                <RecommendationsBanner
                  onViewRecommendations={handleOpenRecommendations}
                  count={recommendations.length}
                />

                <div className="queues-search-section">
                  <Field className="queues-search-section__field">
                    <Field.Label>Find a queue</Field.Label>
                    <Input
                      start={<SearchIcon />}
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder=""
                    />
                  </Field>
                </div>

                <div className="queues-table-section">
                  <p className="queues-table-section__count">
                    {filteredQueues.length} queues
                  </p>
                  <QueuesTable
                    queues={filteredQueues}
                    onReorder={handleReorderQueues}
                    onQueueSelect={handleQueueSelect}
                    onStartQueueEvaluation={handleStartQueueEvaluation}
                    queuesInEvaluation={queuesInEvaluation}
                    queuesWithResults={queuesWithResults}
                    onDeleteQueue={handleDeleteQueue}
                    onCloneQueue={handleCloneQueue}
                  />
                </div>
              </div>
            </main>

            {evaluatingQueue && (
              <QueueEvaluationPanel
                queue={evaluatingQueue}
                onClose={handleCloseQueueEvaluation}
                phase={evaluationPhase}
                progress={evaluationProgress}
                onBeginEvaluation={handleBeginEvaluation}
                setEvaluationProgress={setEvaluationProgress}
                onEnablePredictive={handleEnablePredictiveRouting}
                onKeepInitial={handleKeepInitialRouting}
                onDismiss={handleDismissResults}
                onCloseEnabled={handleCloseEnabledState}
              />
            )}

            <RecommendationsDrawer
              isOpen={isRecommendationsOpen}
              onClose={() => {
                setIsRecommendationsOpen(false);
                setSelectedRecommendation(null);
              }}
              selectedRecommendation={selectedRecommendation}
              onSelectRecommendation={setSelectedRecommendation}
              onApplyRecommendation={handleApplyRecommendation}
              inactiveQueues={queues.filter(
                (q) => q.assignmentMethod !== "Predictive routing",
              )}
              recommendations={recommendations}
            />

            <CopilotSidebar
              isOpen={isCopilotOpen}
              onClose={() => setIsCopilotOpen(false)}
            />
          </div>
        </div>
      </div>
      {showNotification && (
        <div className="queues-notification-wrapper">
          <Notification type="success">
            <Notification.Title>
              Predictive routing activated
            </Notification.Title>
            Predictive routing is now active for all queues.
            <Notification.Close
              aria-label="Dismiss notification"
              onClick={() => setShowNotification(false)}
            />
          </Notification>
        </div>
      )}
    </div>
  );
}
