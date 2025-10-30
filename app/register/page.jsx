"use client";
import { useState, useEffect } from "react";
import { FolderUp, Plus } from "lucide-react";
import Stepper from "../../components/Stepper.jsx";
import { toast } from "react-toastify";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Image from "next/image.js";
import { useRouter } from "next/navigation";
import axios from "axios";
import {
  submitProfileDetails,
  getcity,
  fetchstates,
  fetchProfileDetails,
  fetchSkills,
  fetchCertifications,
} from "@/utils/apihelper";
import SearchableSelect from "../../components/SearchableSelect";
import SearchableMultiSelect from "../../components/SearchableMultiSelect";

export default function ProfileDetails() {
  const [currentStep, setCurrentStep] = useState(1);
  const [completedSteps, setCompletedSteps] = useState([]);
  const [isCompleted, setIsCompleted] = useState(false);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [loadingStates, setLoadingStates] = useState(false);
  const [loadingCities, setLoadingCities] = useState(false);
  // Step 1 - Personal Details
  const [personalData, setPersonalData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    country: "India",
    state: "",
    city: "",
    designation: "",
    mobile: "",
    otp: "",
    whatsappAlerts: false,
  });

  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);

  // Step 2 - Education Details
  const [educationEntries, setEducationEntries] = useState([
    {
      institute: "",
      educationType: "",
      marks: "",
      fromDate: null,
      toDate: null,
      description: "",
      visibility: "Employers Only",
      currentlyPursuing: false,
    },
  ]);

  const addEducationEntry = () => {
    setEducationEntries([
      ...educationEntries,
      {
        institute: "",
        educationType: "",
        marks: "",
        fromDate: null,
        toDate: null,
        description: "",
        visibility: "Employers Only",
        currentlyPursuing: false,
      },
    ]);
  };

  const removeEducationEntry = (index) => {
    if (educationEntries.length > 1) {
      setEducationEntries(educationEntries.filter((_, i) => i !== index));
    }
  };

  const updateEducationEntry = (index, field, value) => {
    const updated = educationEntries.map((entry, i) =>
      i === index ? { ...entry, [field]: value } : entry
    );
    setEducationEntries(updated);
  };

  // Step 3 - Work Experience
  const [workEntries, setWorkEntries] = useState([
    {
      designation: "",
      company: "",
      experience: "Fresher",
      fromDate: null,
      toDate: null,
      description: "",
      visibility: "Employers Only",
      currentlyWorking: false,
    },
  ]);

  const experienceOptions = [
    "Fresher",
    "1 Year",
    "2 Years",
    "3 Years",
    "4 Years",
    "5 Years",
    "6 Years",
    "7 Years",
    "8 Years",
    "9 Years",
    "10+ Years",
    "15+ Years",
    "20+ Years",
  ];

  const [skillsOptions, setSkillsOptions] = useState([]);

  const [certificationsOptions, setCertificationsOptions] = useState([]);

  const [selectedSkills, setSelectedSkills] = useState([]);
  const [selectedCertifications, setSelectedCertifications] = useState([]);
  const [resume, setResume] = useState(null);

  const addWorkEntry = () => {
    setWorkEntries([
      ...workEntries,
      {
        designation: "",
        company: "",
        experience: "1 Year",
        fromDate: null,
        toDate: null,
        description: "",
        visibility: "Employers Only",
      },
    ]);
  };

  const removeWorkEntry = (index) => {
    if (workEntries.length > 1) {
      setWorkEntries(workEntries.filter((_, i) => i !== index));
    }
  };

  const updateWorkEntry = (index, field, value) => {
    const updatedEntries = workEntries.map((entry, i) =>
      i === index ? { ...entry, [field]: value } : entry
    );
    setWorkEntries(updatedEntries);
  };

  const handleSkillSelect = (skill) => {
    const val =
      typeof skill === "string"
        ? skill
        : (skill && (skill.skill_name || skill.name || skill.value)) ||
          String(skill);
    if (!selectedSkills.includes(val)) {
      setSelectedSkills([...selectedSkills, val]);
    }
  };

  const removeSkill = (skill) => {
    const key =
      typeof skill === "string"
        ? skill
        : (skill && (skill.skill_name || skill.name || skill.value)) ||
          String(skill);
    setSelectedSkills(selectedSkills.filter((s) => s !== key));
  };

  const handleCertificationSelect = (cert) => {
    const val =
      typeof cert === "string"
        ? cert
        : (cert && (cert.certificate_name || cert.name || cert.value)) ||
          String(cert);
    if (!selectedCertifications.includes(val)) {
      setSelectedCertifications([...selectedCertifications, val]);
    }
  };

  const removeCertification = (cert) => {
    const key =
      typeof cert === "string"
        ? cert
        : (cert && (cert.certificate_name || cert.name || cert.value)) ||
          String(cert);
    setSelectedCertifications(selectedCertifications.filter((c) => c !== key));
  };

  const handleNext = () => {
    if (currentStep === 1) {
      if (!validatePersonal()) {
        toast.error("Please fill all required fields.");
        return;
      }
    }
    if (currentStep === 2) {
      if (!validateEducation()) {
        toast.error("Please fill all required fields.");
        return;
      }
    }
    if (currentStep === 3) {
      // if (!validateWork()) {
      //     // toast.error('Please fill all required fields.');
      //     // return;
      // }
    }
    if (currentStep < 3) {
      setCompletedSteps([...completedSteps, currentStep]);
      setCurrentStep(currentStep + 1);
    } else {
      setCompletedSteps([1, 2, 3]);
      setIsCompleted(true);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCompletedSteps(completedSteps.filter((step) => step !== currentStep));
      setCurrentStep(currentStep - 1);
    }
  };

  const normalizeToStringArray = (arr) => {
    if (!Array.isArray(arr)) return [];
    const mapped = arr
      .map((item) => {
        if (typeof item === "string") return item;
        if (item == null) return "";
        // common name fields
        return (
          item.skill_name ||
          item.name ||
          item.value ||
          item.label ||
          item.certificate_name ||
          item.certificateName ||
          JSON.stringify(item)
        );
      })
      .filter(Boolean);
    // dedupe while preserving order
    return Array.from(new Set(mapped));
  };
  const router = useRouter();
  useEffect(() => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token");
      if (!token) {
        router.replace("/join");
      }
    }

    // Fetch and prefill profile details
    const getProfile = async () => {
      const result = await fetchProfileDetails();
      // result may be in different shapes depending on backend:
      // { status: true, data: { ... } } OR { success: true, data: { ... } } OR the API might return the data object directly
      console.log("fetchProfileDetails result:", result);

      // If the API returned a wrapper with data property, prefer that
      let d = null;
      if (
        result &&
        (result.status === true || result.success === true) &&
        result.data
      ) {
        d = result.data;
      } else if (result && result.data && typeof result.data === "object") {
        // in case wrapper exists but status/success wasn't provided
        d = result.data;
      } else if (
        result &&
        typeof result === "object" &&
        !("status" in result) &&
        !("success" in result) &&
        Object.keys(result).length
      ) {
        // API returned the data object directly
        d = result;
      }

      if (!d) return;

      // Normalize keys from backend to match our form state
      // Prefer explicit first_name/last_name, otherwise split full_name into parts
      let firstName = d.first_name || d.firstName || "";
      let lastName = d.last_name || d.lastName || "";
      console.log("d.full_name", d.full_name);
      if ((!firstName || !lastName) && d.full_name) {
        const parts = String(d.full_name).trim().split(/\s+/);
        if (!firstName) firstName = parts.shift() || "";
        if (!lastName) lastName = parts.length ? parts.join(" ") : "";
      }
      setPersonalData({
        firstName: firstName,
        lastName: lastName,
        email: d.email || "",
        country: d.country || "",
        state: d.state || "",
        city: d.city || "",
        designation: d.designation || "",
        mobile: d.mobile || d.phone_number || "",
        otp: "",
        whatsappAlerts: Boolean(
          d.whatsapp_alert ?? d.whatsappAlerts ?? d.whatsapp_alerts
        ),
      });
      // Map educations -> front-end educationEntries shape
      const educationsRaw = Array.isArray(d.educations)
        ? d.educations
        : typeof d.educations === "string"
        ? tryParseJSON(d.educations)
        : [];
      const educationsMapped = (educationsRaw || []).map((ed) => ({
        institute: ed.institute || "",
        educationType: ed.education_type || ed.educationType || "",
        marks: ed.marks || "",
        fromDate: ed.from_date ? new Date(ed.from_date) : null,
        toDate: ed.to_date ? new Date(ed.to_date) : null,
        description: ed.description || "",
        visibility: ed.visibility || "Employers Only",
        currentlyPursuing: Boolean(
          ed.currently_pursuing || ed.currentlyPursuing
        ),
      }));

      // Map works -> front-end workEntries shape
      const worksRaw = Array.isArray(d.works)
        ? d.works
        : typeof d.works === "string"
        ? tryParseJSON(d.works)
        : [];
      const worksMapped = (worksRaw || []).map((w) => ({
        designation: w.designation || "",
        company: w.company || "",
        experience: w.experience || "Fresher",
        fromDate: w.from_date ? new Date(w.from_date) : null,
        toDate: w.to_date ? new Date(w.to_date) : null,
        description: w.description || "",
        visibility: w.visibility || "Employers Only",
        currentlyWorking: Boolean(w.currently_working || w.currentlyWorking),
      }));

      // Map skills and certifications to arrays of strings
      const skillsMapped = Array.isArray(d.userSkills)
        ? d.userSkills
            .map((s) => s.skill_name || s.skillName || "")
            .filter(Boolean)
        : typeof d.userSkills === "string"
        ? tryParseJSON(d.userSkills)
        : [];

      const certsMapped = Array.isArray(d.userCertificates)
        ? d.userCertificates
            .map((c) => c.certificate_name || c.certificateName || "")
            .filter(Boolean)
        : typeof d.userCertificates === "string"
        ? tryParseJSON(d.userCertificates)
        : [];

      setEducationEntries(
        educationsMapped.length ? educationsMapped : educationEntries
      );
      setWorkEntries(worksMapped.length ? worksMapped : workEntries);
      setSelectedSkills(Array.isArray(skillsMapped) ? skillsMapped : []);
      setSelectedCertifications(Array.isArray(certsMapped) ? certsMapped : []);
      // Resume cannot be prefilled as file, but you can show a link if needed (d.resume)
    };

    // small helper to safely parse JSON
    function tryParseJSON(value) {
      try {
        return JSON.parse(value);
      } catch (e) {
        return null;
      }
    }
    getProfile();

    // Fetch skills and certifications (public endpoints)
    const getLookups = async () => {
      try {
        const s = await fetchSkills();
        if (s && s.success === true && Array.isArray(s.skills)) {
          setSkillsOptions(normalizeToStringArray(s.skills));
        } else if (Array.isArray(s)) {
          setSkillsOptions(normalizeToStringArray(s));
        }
      } catch (e) {
        // ignore, keep defaults
      }

      try {
        const s = await fetchstates();
        if (s && s.success === true && Array.isArray(s.data)) {
          setStates(normalizeToStringArray(s.data));
        } else if (Array.isArray(s)) {
          setStates(normalizeToStringArray(s));
        }
      } catch (e) {
        // ignore, keep defaults
      }
      try {
        const c = await fetchCertifications();
        if (c && c.success === true && Array.isArray(c.certificates)) {
          setCertificationsOptions(normalizeToStringArray(c.certificates));
        } else if (Array.isArray(c)) {
          setCertificationsOptions(normalizeToStringArray(c));
        }
      } catch (e) {
        // ignore
      }
    };
    getLookups();
  }, []);

  const fetchCities = async (stateName) => {
    if (!stateName) {
      setCities([]);
      return;
    }

    setLoadingCities(true);
    try {
      // Wait for the promise to resolve
      const s = await getcity(stateName);

      if (s && s.success === true && Array.isArray(s.cities)) {
        console.log("s", s);
        setCities(normalizeToStringArray(s.cities));
      } else if (Array.isArray(s)) {
        setCities(normalizeToStringArray(s));
      } else {
        setCities([]);
      }
    } catch (error) {
      console.error("Error fetching cities:", error);
      toast.error("Failed to load cities");
    } finally {
      setLoadingCities(false);
    }
  };

  const handleStateChange = (stateName) => {
    setPersonalData({
      ...personalData,
      state: stateName,
      city: "", // Reset city when state changes
    });
    fetchCities(stateName);

    // Clear state error if any
    if (personalErrors.state) {
      setPersonalErrors({ ...personalErrors, state: "" });
    }
  };

  const handleCityChange = (cityName) => {
    setPersonalData({ ...personalData, city: cityName });

    // Clear city error if any
    if (personalErrors.city) {
      setPersonalErrors({ ...personalErrors, city: "" });
    }
  };
  // Error states for all fields
  const [personalErrors, setPersonalErrors] = useState({
    firstName: "",
    lastName: "",
    email: "",
    country: "",
    state: "",
    city: "",
    designation: "",
    mobile: "",
    otp: "",
  });
  const [educationErrors, setEducationErrors] = useState([]); // array of objects per entry
  const [workErrors, setWorkErrors] = useState([]); // array of objects per entry
  const [resumeError, setResumeError] = useState("");
  const [submitLoading, setSubmitLoading] = useState(false);

  // Validation functions
  const validatePersonal = () => {
    let errors = {};
    if (!personalData.firstName.trim())
      errors.firstName = "First name is required";
    if (!personalData.lastName.trim())
      errors.lastName = "Last name is required";
    if (!personalData.email.trim()) errors.email = "Email is required";
    else if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(personalData.email))
      errors.email = "Enter a valid email";
    if (!personalData.state.trim()) errors.state = "State is required";
    if (!personalData.city.trim()) errors.city = "City is required";
    if (!personalData.designation.trim())
      errors.designation = "Designation is required";
    if (!personalData.mobile.trim()) errors.mobile = "Mobile is required";
    else if (!/^\d{10}$/.test(personalData.mobile.replace(/\D/g, "")))
      errors.mobile = "Enter a valid 10-digit mobile number";
    if (otpSent && !personalData.otp.trim()) errors.otp = "OTP is required";
    setPersonalErrors(errors);
    return Object.keys(errors).length === 0;
  };
  const validateEducation = () => {
    let errorsArr = educationEntries.map((entry) => {
      let err = {};
      if (!entry.institute.trim()) err.institute = "Institute is required";
      if (!entry.educationType.trim())
        err.educationType = "Education type is required";
      if (!entry.marks.trim()) err.marks = "Marks are required";
      if (!entry.fromDate) err.fromDate = "From date is required";
      // Skip toDate validation if currently pursuing
      if (!entry.currentlyPursuing && !entry.toDate)
        err.toDate = "To date is required";
      return err;
    });
    setEducationErrors(errorsArr);
    return errorsArr.every((e) => Object.keys(e).length === 0);
  };
  const validateWork = () => {
    let errorsArr = workEntries.map((entry) => {
      let err = {};
      // Skip validation if experience is 'Fresher'
      if (entry.experience !== "Fresher") {
        if (!entry.designation.trim())
          err.designation = "Designation is required";
        if (!entry.company.trim()) err.company = "Company is required";
        if (!entry.fromDate) err.fromDate = "From date is required";
        // Skip toDate validation if currently working
        if (!entry.currentlyWorking && !entry.toDate)
          err.toDate = "To date is required";
      }
      return err;
    });
    setWorkErrors(errorsArr);
    return errorsArr.every((e) => Object.keys(e).length === 0);
  };
  const validateResume = () => {
    // if (!resume) {
    //     setResumeError('Resume is required');
    //     return false;
    // }
    setResumeError("");
    return true;
  };

  // Remove error on type
  const handlePersonalChange = (field, value) => {
    setPersonalData({ ...personalData, [field]: value });
    if (personalErrors[field])
      setPersonalErrors({ ...personalErrors, [field]: "" });
  };
  const handleEducationChange = (index, field, value) => {
    updateEducationEntry(index, field, value);
    if (educationErrors[index]?.[field]) {
      const newErrors = [...educationErrors];
      newErrors[index] = { ...newErrors[index], [field]: "" };
      setEducationErrors(newErrors);
    }
  };
  const handleWorkChange = (index, field, value) => {
    updateWorkEntry(index, field, value);
    if (workErrors[index]?.[field]) {
      const newErrors = [...workErrors];
      newErrors[index] = { ...newErrors[index], [field]: "" };
      setWorkErrors(newErrors);
    }
  };

  // Calculate total experience from dropdown selections
  const calculateTotalExperience = () => {
    let totalYears = 0;

    workEntries.forEach((entry) => {
      if (entry.experience === "Fresher") {
        return;
      }

      const match = entry.experience.match(/^(\d+)/);
      if (match) {
        totalYears += parseInt(match[1]);
      } else if (entry.experience === "10+ Years") {
        totalYears += 10;
      } else if (entry.experience === "15+ Years") {
        totalYears += 15;
      } else if (entry.experience === "20+ Years") {
        totalYears += 20;
      }
    });

    if (totalYears === 0) {
      return "Fresher";
    } else if (totalYears === 1) {
      return "1 Year";
    } else {
      return `${totalYears} Years`;
    }
  };

  // Helper function to get date range based on experience
  const getExperienceDateRange = (
    experience,
    isToDate = false,
    fromDate = null
  ) => {
    const today = new Date();

    if (experience === "Fresher") return { minDate: null, maxDate: today };

    const match = experience.match(/^(\d+)/);
    let years;
    if (match) {
      years = parseInt(match[1]);
    } else if (experience === "10+ Years") {
      years = 10;
    } else {
      return { minDate: null, maxDate: today };
    }

    if (isToDate) {
      if (!fromDate) {
        return { minDate: null, maxDate: today };
      }

      // For To Date:
      // max = fromDate + experience + 11 months
      // min = fromDate + experience - 1 month
      const maxToDate = new Date(
        fromDate.getFullYear() + years,
        fromDate.getMonth() + 11,
        fromDate.getDate()
      );
      const minToDate = new Date(
        fromDate.getFullYear() + years,
        fromDate.getMonth() - 1,
        fromDate.getDate()
      );

      // Ensure maxToDate doesn't exceed today
      const finalMaxDate = maxToDate > today ? today : maxToDate;

      return { minDate: minToDate, maxDate: finalMaxDate };
    } else {
      // For From Date: can go to any previous date, max = today - experience years
      const maxFromDate = new Date(
        today.getFullYear() - years,
        today.getMonth(),
        today.getDate()
      );

      return { minDate: null, maxDate: maxFromDate };
    }
  };

  const handleResumeChange = (file) => {
    setResume(file);
    if (resumeError) setResumeError("");
  };

  // Final submit handler
  const handleSubmitProfile = async () => {
    const validPersonal = validatePersonal();
    const validEducation = validateEducation();
    const validWork = validateWork();
    const validResume = validateResume();
    console.log("Validation results:", {
      validPersonal,
      validEducation,
      validWork,
      validResume,
    });
    if (!validPersonal || !validEducation || !validWork || !validResume) {
      toast.error("Please fill all required fields.");
      return;
    }
    setSubmitLoading(true);
    try {
      console.log("Submitting profile with payload:", {
        personalData,
        educationEntries,
        workEntries,
        selectedSkills,
        selectedCertifications,
        resume: resume
          ? { name: resume.name, size: resume.size, type: resume.type }
          : null,
      });

      const result = await submitProfileDetails({
        personalData,
        educationEntries,
        workEntries,
        selectedSkills,
        selectedCertifications,
        resume,
      });
      console.log("submitProfileDetails result:", result);
      if (result?.success) {
        toast.success("Profile submitted successfully!");
        setCompletedSteps([1, 2, 3]);
      } else {
        console.error("Submission failed:", result);
        toast.error(result?.message || "Submission failed");
      }
    } catch (e) {
      console.error("Submit error:", e);
      toast.error(e?.message || "Submission failed");
    } finally {
      setSubmitLoading(false);
    }
  };

  return (
    <section className="bg-[url('/bg_details.webp')] bg-cover bg-center">
      <div className="pb-12 pt-8">
        <Stepper currentStep={currentStep} completedSteps={completedSteps} />

        <div className="container">
          {currentStep === 1 && (
            <div className="max-w-xl mx-auto">
              <div className="text-center">
                <h2 className="text-2xl font-bold mb-2">Personal Details</h2>
                <p className="text-gray-600 mb-6">
                  Please provide all your details to proceed.
                </p>
              </div>

              <div className="space-y-4 bg-white p-6 rounded-xl shadow">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      First Name
                    </label>
                    <input
                      type="text"
                      placeholder=""
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-prime focus:border-prime outline-none"
                      value={personalData.firstName}
                      onChange={(e) =>
                        handlePersonalChange("firstName", e.target.value)
                      }
                    />
                    {personalErrors.firstName && (
                      <p className="text-red-500 text-xs mt-1">
                        {personalErrors.firstName}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Last Name
                    </label>
                    <input
                      type="text"
                      placeholder=""
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-prime focus:border-prime outline-none"
                      value={personalData.lastName}
                      onChange={(e) =>
                        handlePersonalChange("lastName", e.target.value)
                      }
                    />
                    {personalErrors.lastName && (
                      <p className="text-red-500 text-xs mt-1">
                        {personalErrors.lastName}
                      </p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Official Email Id
                    </label>
                    <input
                      type="email"
                      placeholder="jhondoe@gmail.com"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-prime focus:border-prime outline-none"
                      value={personalData.email}
                      onChange={(e) =>
                        handlePersonalChange("email", e.target.value)
                      }
                      readOnly
                    />
                    {personalErrors.email && (
                      <p className="text-red-500 text-xs mt-1">
                        {personalErrors.email}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Country
                    </label>
                    <input
                      type="text"
                      placeholder="India"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-prime focus:border-prime outline-none"
                      value={personalData.country}
                      onChange={(e) =>
                        handlePersonalChange("country", e.target.value)
                      }
                    />
                    {personalErrors.country && (
                      <p className="text-red-500 text-xs mt-1">
                        {personalErrors.country}
                      </p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <SearchableSelect
                    label="State"
                    options={states}
                    value={personalData.state}
                    onChange={handleStateChange}
                    placeholder="Select State"
                    error={personalErrors.state}
                    disabled={loadingStates}
                  />
                  <SearchableSelect
                    label="City"
                    options={cities}
                    value={personalData.city}
                    onChange={handleCityChange}
                    placeholder="Select City"
                    error={personalErrors.city}
                    disabled={!personalData.state || loadingCities}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Designation
                    </label>
                    <input
                      type="text"
                      placeholder="Eg. Hr Manager"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-prime focus:border-prime outline-none"
                      value={personalData.designation}
                      onChange={(e) =>
                        handlePersonalChange("designation", e.target.value)
                      }
                    />
                    {personalErrors.designation && (
                      <p className="text-red-500 text-xs mt-1">
                        {personalErrors.designation}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Mobile Number
                    </label>
                    <div className="relative">
                      <input
                        type="tel"
                        placeholder="9875543210"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-prime focus:border-prime outline-none pr-20"
                        value={personalData.mobile}
                        onChange={(e) =>
                          handlePersonalChange("mobile", e.target.value)
                        }
                      />
                      {/* <button
                                                onClick={() => {
                                                    if (!otpSent) {
                                                        setOtpSent(true);
                                                        toast.success('OTP sent successfully!');
                                                    } else {
                                                        toast.success('OTP resent successfully!');
                                                    }
                                                }}
                                                className="text-prime text-[14px] whitespace-nowrap absolute right-2 bottom-2.5 underline"
                                            >
                                                {otpSent ? 'Resend OTP' : 'Verify'}
                                            </button> */}
                    </div>
                    {personalErrors.mobile && (
                      <p className="text-red-500 text-xs mt-1">
                        {personalErrors.mobile}
                      </p>
                    )}
                  </div>
                </div>

                {otpSent && (
                  <div>
                    <p className="text-sm text-black mb-2">
                      We have sent an OTP to your registered mobile number. It
                      will be valid for the next 10 minutes. Please enter it in
                      the box below.
                    </p>
                    <div className="relative">
                      <input
                        type="text"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-prime focus:border-prime outline-none pr-24"
                        value={personalData.otp}
                        placeholder="Enter OTP"
                        onChange={(e) =>
                          handlePersonalChange("otp", e.target.value)
                        }
                      />
                      <button
                        onClick={() => {
                          if (personalData.otp) {
                            setOtpVerified(true);
                            toast.success("OTP verified successfully!");
                          } else {
                            toast.error("Please enter OTP");
                          }
                        }}
                        className="text-prime text-[14px] whitespace-nowrap absolute right-2 bottom-2.5 underline"
                      >
                        Verify OTP
                      </button>
                    </div>
                    {personalErrors.otp && (
                      <p className="text-red-500 text-xs mt-1">
                        {personalErrors.otp}
                      </p>
                    )}
                  </div>
                )}

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="whatsapp"
                    checked={personalData.whatsappAlerts}
                    onChange={(e) =>
                      setPersonalData({
                        ...personalData,
                        whatsappAlerts: e.target.checked,
                      })
                    }
                    className="mr-2 w-4 h-4"
                  />
                  <label htmlFor="whatsapp" className="text-sm font-medium">
                    Get Job Alerts on WhatsApp
                  </label>
                </div>

                <div className="flex mt-8">
                  <button
                    onClick={handleNext}
                    className="px-6 py-2 flex-1 bg-prime text-white rounded-full hover:bg-sec ml-auto"
                  >
                    Next
                  </button>
                </div>
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div className="max-w-4xl mx-auto">
              <div className="text-center">
                <h2 className="text-2xl font-bold mb-2">Education Details</h2>
                <p className="text-gray-600 mb-6">
                  Please provide all your details to proceed.
                </p>
              </div>

              <div className="space-y-6 bg-white p-6 rounded-xl shadow">
                {educationEntries.map((entry, index) => (
                  <div
                    key={index}
                    className="space-y-4 border-b border-gray-200 pb-4 last:border-b-0"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">
                          Institute/Collage Name
                        </label>
                        <input
                          type="text"
                          placeholder="Mumbai University"
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-prime focus:border-prime outline-none"
                          value={entry.institute}
                          onChange={(e) =>
                            handleEducationChange(
                              index,
                              "institute",
                              e.target.value
                            )
                          }
                        />
                        {educationErrors[index]?.institute && (
                          <p className="text-red-500 text-xs mt-1">
                            {educationErrors[index].institute}
                          </p>
                        )}
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">
                          Education/Degree Type
                        </label>
                        <input
                          type="text"
                          placeholder="Bachelors In Science"
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-prime focus:border-prime outline-none"
                          value={entry.educationType}
                          onChange={(e) =>
                            handleEducationChange(
                              index,
                              "educationType",
                              e.target.value
                            )
                          }
                        />
                        {educationErrors[index]?.educationType && (
                          <p className="text-red-500 text-xs mt-1">
                            {educationErrors[index].educationType}
                          </p>
                        )}
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">
                          Marks/CGPA
                        </label>
                        <input
                          type="text"
                          placeholder="8.9"
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-prime focus:border-prime outline-none"
                          value={entry.marks}
                          onChange={(e) =>
                            handleEducationChange(
                              index,
                              "marks",
                              e.target.value
                            )
                          }
                        />
                        {educationErrors[index]?.marks && (
                          <p className="text-red-500 text-xs mt-1">
                            {educationErrors[index].marks}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">
                          From
                        </label>
                        <DatePicker
                          selected={entry.fromDate}
                          onChange={(date) =>
                            handleEducationChange(index, "fromDate", date)
                          }
                          dateFormat="MMM yyyy"
                          showMonthYearPicker
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-prime focus:border-prime outline-none"
                          placeholderText="Select month/year"
                          wrapperClassName="w-full"
                          maxDate={new Date()}
                        />
                        {educationErrors[index]?.fromDate && (
                          <p className="text-red-500 text-xs mt-1">
                            {educationErrors[index].fromDate}
                          </p>
                        )}
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">
                          To
                        </label>
                        <DatePicker
                          selected={
                            entry.currentlyPursuing ? null : entry.toDate
                          }
                          onChange={(date) => {
                            if (!entry.currentlyPursuing) {
                              handleEducationChange(index, "toDate", date);
                            }
                          }}
                          dateFormat="MMM yyyy"
                          showMonthYearPicker
                          className={`w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-prime focus:border-prime outline-none ${
                            entry.currentlyPursuing
                              ? "bg-gray-100 cursor-not-allowed"
                              : ""
                          }`}
                          placeholderText={
                            entry.currentlyPursuing
                              ? "Currently Pursuing"
                              : "Aug 2025"
                          }
                          wrapperClassName="w-full"
                          maxDate={new Date()}
                          disabled={entry.currentlyPursuing}
                          readOnly={entry.currentlyPursuing}
                        />
                        <div className="flex items-center mt-2">
                          <input
                            type="checkbox"
                            id={`currently-pursuing-${index}`}
                            checked={entry.currentlyPursuing || false}
                            onChange={(e) => {
                              const isChecked = e.target.checked;
                              const updated = educationEntries.map((item, i) =>
                                i === index
                                  ? {
                                      ...item,
                                      currentlyPursuing: isChecked,
                                      toDate: isChecked ? null : item.toDate,
                                    }
                                  : item
                              );
                              setEducationEntries(updated);
                              // Clear error if currently pursuing
                              if (isChecked && educationErrors[index]?.toDate) {
                                const newErrors = [...educationErrors];
                                if (newErrors[index]) {
                                  newErrors[index] = {
                                    ...newErrors[index],
                                    toDate: "",
                                  };
                                }
                                setEducationErrors(newErrors);
                              }
                            }}
                            className="mr-2"
                          />
                          <label
                            htmlFor={`currently-pursuing-${index}`}
                            className="text-sm cursor-pointer"
                          >
                            Currently Pursuing
                          </label>
                        </div>
                        {educationErrors[index]?.toDate &&
                          !entry.currentlyPursuing && (
                            <p className="text-red-500 text-xs mt-1">
                              {educationErrors[index].toDate}
                            </p>
                          )}
                      </div>
                      <div className="flex items-end">
                        {educationEntries.length > 1 && (
                          <button
                            onClick={() => removeEducationEntry(index)}
                            className="px-4 py-2 text-red-600 border border-red-300 rounded-lg hover:bg-red-50"
                          >
                            Remove
                          </button>
                        )}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Description
                      </label>
                      <textarea
                        ref={(el) => {
                          if (el && entry.description) {
                            el.style.height = "auto";
                            el.style.height =
                              Math.max(90, el.scrollHeight) + "px";
                          }
                        }}
                        placeholder="Describe your education experience..."
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-prime focus:border-prime outline-none resize-none overflow-hidden"
                        style={{ minHeight: "90px" }}
                        value={entry.description || ""}
                        onChange={(e) => {
                          updateEducationEntry(
                            index,
                            "description",
                            e.target.value
                          );
                          e.target.style.height = "auto";
                          e.target.style.height =
                            Math.max(90, e.target.scrollHeight) + "px";
                        }}
                      />
                    </div>
                  </div>
                ))}

                <button
                  onClick={addEducationEntry}
                  className="border border-prime rounded-full gap-2 text-prime hover:bg-prime hover:text-white w-full py-1"
                >
                  Add More
                </button>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Visibility Settings (Who can see your education details):
                  </label>
                  <div className="flex gap-2 flex-col sm:flex-row sm:gap-4 md:gap-5">
                    {["Employers Only", "Hidden"].map((option) => (
                      <label
                        key={option}
                        className="flex items-center !text-gray-600"
                      >
                        <input
                          type="radio"
                          name="educationVisibility"
                          value={option}
                          checked={educationEntries[0]?.visibility === option}
                          onChange={(e) =>
                            updateEducationEntry(
                              0,
                              "visibility",
                              e.target.value
                            )
                          }
                          className="mr-1"
                        />
                        {option}
                      </label>
                    ))}
                  </div>
                </div>

                <div className="flex gap-4 mt-8">
                  <button
                    onClick={handleBack}
                    className="px-6 py-2 flex-1 border border-prime rounded-full text-prime hover:bg-prime hover:text-white"
                  >
                    Back
                  </button>
                  <button
                    onClick={handleNext}
                    className="px-6 py-2 flex-1 bg-prime text-white rounded-full hover:bg-sec"
                  >
                    Next
                  </button>
                </div>
              </div>
            </div>
          )}

          {currentStep === 3 && !completedSteps.includes(3) && (
            <div className="max-w-4xl mx-auto">
              <div className="text-center">
                <h2 className="text-2xl font-bold mb-2">Work Experience</h2>
                <p className="text-gray-600 mb-6">
                  Please provide all your details to proceed.
                </p>
              </div>

              <div className="space-y-6 bg-white p-6 rounded-xl shadow">
                {workEntries.map((entry, index) => (
                  <div
                    key={index}
                    className="space-y-4 border-b border-gray-200 pb-4 last:border-b-0"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">
                          {entry.experience === "Fresher"
                            ? "Role/Designation"
                            : "Designation"}
                        </label>
                        <input
                          type="text"
                          placeholder={
                            entry.experience === "Fresher"
                              ? "Software Developer"
                              : "Social Media Marketing"
                          }
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-prime focus:border-prime outline-none"
                          value={entry.designation}
                          onChange={(e) =>
                            handleWorkChange(
                              index,
                              "designation",
                              e.target.value
                            )
                          }
                        />
                        {workErrors[index]?.designation && (
                          <p className="text-red-500 text-xs mt-1">
                            {workErrors[index].designation}
                          </p>
                        )}
                      </div>
                      {entry.experience !== "Fresher" && (
                        <div>
                          <label className="block text-sm font-medium mb-2">
                            Company
                          </label>
                          <input
                            type="text"
                            placeholder="Vortex Solution"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-prime focus:border-prime outline-none"
                            value={entry.company}
                            onChange={(e) =>
                              handleWorkChange(index, "company", e.target.value)
                            }
                          />
                          {workErrors[index]?.company && (
                            <p className="text-red-500 text-xs mt-1">
                              {workErrors[index].company}
                            </p>
                          )}
                        </div>
                      )}
                      <div>
                        <label className="block text-sm font-medium mb-2">
                          Experience
                        </label>
                        <select
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-prime focus:border-prime outline-none"
                          value={entry.experience}
                          onChange={(e) =>
                            updateWorkEntry(index, "experience", e.target.value)
                          }
                        >
                          {experienceOptions
                            .filter((option, optionIndex) => {
                              if (index === 0) return true;
                              return option !== "Fresher";
                            })
                            .map((option) => (
                              <option key={option} value={option}>
                                {option}
                              </option>
                            ))}
                        </select>
                      </div>
                    </div>

                    {entry.experience !== "Fresher" && (
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <label className="block text-sm font-medium mb-2">
                            From
                          </label>
                          <DatePicker
                            selected={entry.fromDate}
                            onChange={(date) =>
                              handleWorkChange(index, "fromDate", date)
                            }
                            dateFormat="dd MMM yyyy"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-prime focus:border-prime outline-none"
                            placeholderText="04 May 2020"
                            wrapperClassName="w-full"
                            maxDate={
                              getExperienceDateRange(entry.experience, false)
                                .maxDate
                            }
                            showMonthDropdown
                            showYearDropdown
                            dropdownMode="select"
                          />
                          {workErrors[index]?.fromDate && (
                            <p className="text-red-500 text-xs mt-1">
                              {workErrors[index].fromDate}
                            </p>
                          )}
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-2">
                            To
                          </label>
                          <DatePicker
                            selected={
                              entry.currentlyWorking ? null : entry.toDate
                            }
                            onChange={(date) => {
                              if (!entry.currentlyWorking) {
                                handleWorkChange(index, "toDate", date);
                              }
                            }}
                            dateFormat="dd MMM yyyy"
                            className={`w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-prime focus:border-prime outline-none ${
                              entry.currentlyWorking
                                ? "bg-gray-100 cursor-not-allowed"
                                : ""
                            }`}
                            placeholderText={
                              entry.currentlyWorking
                                ? "Currently Working"
                                : "04 May 2020"
                            }
                            wrapperClassName="w-full"
                            minDate={
                              getExperienceDateRange(
                                entry.experience,
                                true,
                                entry.fromDate
                              ).minDate
                            }
                            maxDate={
                              getExperienceDateRange(
                                entry.experience,
                                true,
                                entry.fromDate
                              ).maxDate
                            }
                            showMonthDropdown
                            showYearDropdown
                            dropdownMode="select"
                            disabled={entry.currentlyWorking}
                            readOnly={entry.currentlyWorking}
                          />
                          <div className="flex items-center mt-2">
                            <input
                              type="checkbox"
                              id={`currently-working-${index}`}
                              checked={entry.currentlyWorking || false}
                              onChange={(e) => {
                                const isChecked = e.target.checked;
                                const updated = workEntries.map((item, i) =>
                                  i === index
                                    ? {
                                        ...item,
                                        currentlyWorking: isChecked,
                                        toDate: isChecked ? null : item.toDate,
                                      }
                                    : item
                                );
                                setWorkEntries(updated);
                                if (isChecked && workErrors[index]?.toDate) {
                                  const newErrors = [...workErrors];
                                  if (newErrors[index]) {
                                    newErrors[index] = {
                                      ...newErrors[index],
                                      toDate: "",
                                    };
                                  }
                                  setWorkErrors(newErrors);
                                }
                              }}
                              className="mr-2"
                            />
                            <label
                              htmlFor={`currently-working-${index}`}
                              className="text-sm cursor-pointer"
                            >
                              Currently Working
                            </label>
                          </div>
                          {workErrors[index]?.toDate &&
                            !entry.currentlyWorking && (
                              <p className="text-red-500 text-xs mt-1">
                                {workErrors[index].toDate}
                              </p>
                            )}
                        </div>
                        <div className="flex items-end">
                          {workEntries.length > 1 && (
                            <button
                              onClick={() => removeWorkEntry(index)}
                              className="px-4 py-2 text-red-600 border border-red-300 rounded-lg hover:bg-red-50"
                            >
                              Remove
                            </button>
                          )}
                        </div>
                      </div>
                    )}

                    {entry.experience !== "Fresher" && (
                      <div>
                        <label className="block text-sm font-medium mb-2">
                          About Role
                        </label>
                        <textarea
                          ref={(el) => {
                            if (el && entry.description) {
                              el.style.height = "auto";
                              el.style.height =
                                Math.max(90, el.scrollHeight) + "px";
                            }
                          }}
                          placeholder="Describe your work experience..."
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-prime focus:border-prime outline-none resize-none overflow-hidden"
                          style={{ minHeight: "90px" }}
                          value={entry.description || ""}
                          onChange={(e) => {
                            updateWorkEntry(
                              index,
                              "description",
                              e.target.value
                            );
                            e.target.style.height = "auto";
                            e.target.style.height =
                              Math.max(90, e.target.scrollHeight) + "px";
                          }}
                        />
                      </div>
                    )}
                  </div>
                ))}

                {workEntries[0]?.experience !== "Fresher" && (
                  <button
                    onClick={addWorkEntry}
                    className="py-2 text-prime border border-prime rounded-full w-full px-6"
                  >
                    Add More
                  </button>
                )}

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Total Experience
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 outline-none"
                    value={calculateTotalExperience()}
                    readOnly
                  />
                </div>

                <SearchableMultiSelect
                  label="Skill(s)"
                  options={skillsOptions}
                  selectedValues={selectedSkills}
                  onChange={setSelectedSkills}
                  placeholder="Select Skills"
                />

                <SearchableMultiSelect
                  label="Certification(s)"
                  options={certificationsOptions}
                  selectedValues={selectedCertifications}
                  onChange={setSelectedCertifications}
                  placeholder="Select Certifications"
                />

                {/* <div>
                                    <label className="block text-sm font-medium mb-2">Upload Resume</label>
                                <div className="border border-gray-300 rounded-lg p-6 text-center">
                                        <FolderUp className="fill-prime text-white mx-auto" size={50} />
                                    <p className="text-sm text-gray-500 mb-2">Drop your Resume to Upload</p>
                                    <div className="text-xs text-gray-400 mb-3">
                                        <div className="relative w-46 mx-auto">
                                            <span className="border-b absolute w-20 left-0 bottom-2"></span>
                                            OR
                                            <span className="border-b absolute w-20 right-0 bottom-2"></span>
                                        </div>
                                    </div>
                                    <input
                                        type="file"
                                        accept=".pdf,.doc,.docx"
                                            onChange={(e) => handleResumeChange(e.target.files[0])}
                                        className="hidden"
                                        id="resume"
                                    />
                                    <label htmlFor="resume" className="!text-prime cursor-pointer rounded-full border border-prime px-4 py-1.5">
                                        Browse Files
                                    </label>
                                        {resumeError && <p className="text-red-500 text-xs mt-1">{resumeError}</p>}
                                        {resume && (
                                            <p className="text-sm text-gray-600 mt-2">Selected: {resume.name}</p>
                                        )}
                                    </div>
                                </div> */}

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Visibility Settings (Who can see your work experience
                    details):
                  </label>
                  <div className="flex gap-2 flex-col sm:flex-row sm:gap-4 md:gap-5">
                    {["Employers Only", "Hidden"].map((option) => (
                      <label key={option} className="flex items-center">
                        <input
                          type="radio"
                          name="workVisibility"
                          value={option}
                          checked={workEntries[0]?.visibility === option}
                          onChange={(e) =>
                            updateWorkEntry(0, "visibility", e.target.value)
                          }
                          className="mr-2"
                        />
                        {option}
                      </label>
                    ))}
                  </div>
                </div>

                <div className="flex gap-4 mt-8">
                  <button
                    onClick={handleBack}
                    className="px-6 py-2 flex-1 border border-prime rounded-full hover:bg-prime text-prime hover:text-white"
                  >
                    Back
                  </button>
                  <button
                    onClick={handleSubmitProfile}
                    className="px-6 py-2 flex-1 bg-prime text-white rounded-full hover:bg-sec"
                  >
                    {submitLoading ? "Submitting..." : "Save"}
                  </button>
                </div>
              </div>
            </div>
          )}

          {completedSteps.includes(3) && (
            <div className="max-w-4xl mx-auto">
              <div className="text-center p-6 bg-white rounded-xl shadow">
                <div className="w-fit mx-auto">
                  <Image
                    src="/comp.png"
                    width={240}
                    height={240}
                    alt="Congratulations"
                  />
                </div>
                <h2 className="text-xl font-semibold">
                  Profile Updated Successfully!!
                </h2>
                <h3 className="text-xl font-semibold mb-4">
                  Your profile information has been updated successfully.
                </h3>
                <p className="text-sm text-gray-600 mb-8">
                  You can now continue exploring job opportunities that best
                  match your skills and qualifications.
                </p>
                <div className="mb-8 h-0.5 mt-6 bg-gradient-to-r from-transparent via-gray-300 via-gray-300 via-gray-300 to-transparent" />
                {/* <div className="flex gap-4">
                  <button className="flex-1 border border-prime text-prime py-2 rounded-full font-medium">
                    View Job Listing
                  </button>
                  <button className=" flex-1 bg-prime text-white py-2 rounded-full font-medium">
                    Go to Dashboard
                            </button>
                </div> */}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
