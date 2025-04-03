"use client";
import { Copy, Link2 } from "lucide-react";
import { useState, useEffect } from "react";
import axios from "axios";
import { ClipLoader } from "react-spinners";

import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { FiArrowRight, FiCode, FiCpu, FiDatabase, FiGlobe, FiLayers, FiZap } from "react-icons/fi"


export default function Home() {
  const [address, setAddress] = useState("");
  const [generatedLink, setGeneratedLink] = useState("");
  const [isValidAddress, setIsValidAddress] = useState(true);
  const [apiResponse, setApiResponse] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false)


  const validateEthAddress = (address) => {
    const ethAddressRegex = /^0x[a-fA-F0-9]{40}$/;
    return ethAddressRegex.test(address);
  };

  const handleAddressChange = (e) => {
    const newAddress = e.target.value;
    setAddress(newAddress);
    if (newAddress) {
      setIsValidAddress(validateEthAddress(newAddress));
    } else {
      setIsValidAddress(true);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      if (address && isValidAddress) {
        setIsLoading(true);
        try {
          const response = await axios.get(`/api/1inch-proxy?address=${address}`);
          setApiResponse(response.data);
        } catch (error) {
          console.error("API Error:", error);
          setApiResponse({ error: "Failed to fetch token data" });
        } finally {
          setIsLoading(false);
        }
      } else {
        setApiResponse(null);
      }
    };

    fetchData();
  }, [address, isValidAddress]);

  const generateLink = () => {
    if (!address || !isValidAddress) return;
    const baseUrl =
      typeof window !== "undefined" && window.location.hostname === "localhost"
        ? "http://localhost:3000"
        : "https://buymemes.winks.fun";
    const link = `${baseUrl}/wink/${address}`;
    setGeneratedLink(link);
  };

  const copyToClipboard = async () => {
    if (generatedLink) {
      try {
        await navigator.clipboard.writeText(generatedLink);
        alert("Link copied to clipboard!");
      } catch (err) {
        console.error("Failed to copy:", err);
      }
    }
  };



  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300 } },
  }

  const logoAnimation = {
    rest: { scale: 1, opacity: 0.7 },
    hover: { scale: 1.1, opacity: 1, transition: { duration: 0.3 } },
  }

  const features = [
    {
      title: "Smart Routing Engine",
      description:
        "Our proprietary algorithm finds the most efficient paths across multiple DEXes to get you the best rates.",
      icon: <FiCpu className="h-10 w-10" />,
    },
    {
      title: "Swap Execution Protocol",
      description:
        "Execute complex trades across multiple liquidity sources in a single transaction with minimal slippage.",
      icon: <FiLayers className="h-10 w-10" />,
    },
    {
      title: "Advanced Gas Optimization",
      description: "Save on transaction costs with our gas-efficient routing and execution strategies.",
      icon: <FiZap className="h-10 w-10" />,
    },
    {
      title: "Liquidity Source Integration",
      description: "Access deep liquidity from all major DEXes and protocols in one unified interface.",
      icon: <FiDatabase className="h-10 w-10" />,
    },
  ]

  const dexLogos = [
    { name: "Uniswap", logo: "/placeholder.svg?height=80&width=80" },
    { name: "Balancer", logo: "/placeholder.svg?height=80&width=80" },
    { name: "Curve", logo: "/placeholder.svg?height=80&width=80" },
    { name: "SushiSwap", logo: "/placeholder.svg?height=80&width=80" },
    { name: "1inch", logo: "/placeholder.svg?height=80&width=80" },
    { name: "PancakeSwap", logo: "/placeholder.svg?height=80&width=80" },
  ]


  return (
    // <div className="min-h-screen bg-gradient-to-br from-cyan-200 via-pink-100 to-yellow-100 text-gray-800 flex items-center justify-center p-3 font-mono relative overflow-hidden">
    //   {/* Animated background patterns */}
    //   <div className="absolute inset-0 bg-white/50">
    //     <div className="absolute top-0 left-0 w-64 h-64 bg-cyan-300/20 rounded-full -translate-x-1/2 -translate-y-1/2 blur-2xl animate-pulse" />
    //     <div className="absolute top-1/4 right-0 w-72 h-72 bg-pink-300/20 rounded-full translate-x-1/2 blur-2xl animate-pulse delay-75" />
    //     <div className="absolute bottom-0 left-1/3 w-80 h-80 bg-yellow-300/20 rounded-full translate-y-1/2 blur-2xl animate-pulse delay-150" />
    //     <div className="absolute top-1/2 right-1/4 w-56 h-56 bg-cyan-300/20 rounded-full blur-2xl animate-pulse delay-300" />
    //   </div>

    //   <div className="relative w-full max-w-md">
    //     {/* Card glow effect */}
    //     <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 via-pink-300 to-yellow-300 rounded-2xl blur opacity-70 animate-pulse" />

    //     {/* Main card */}
    //     <div className="relative bg-white backdrop-blur-md shadow-2xl rounded-2xl p-6 space-y-3 border border-white">
    //       <div className="text-center">
    //         <p className="text-gray-600 font-medium">Enter BNB contract address to generate a sharable link</p>
    //       </div>

    //       {/* Input section */}
    //       <div className="space-y-2">
    //         <label className="block text-sm font-medium text-gray-700">
    //           BNB Contract Address
    //         </label>
    //         <div className="relative group">
    //           <input
    //             className={`w-full p-3 pl-10 rounded-lg bg-white/90 focus:outline-none border-2 transition-all duration-300 ${
    //               !isValidAddress
    //                 ? "border-red-500 shadow-red-200"
    //                 : "border-cyan-400 focus:border-pink-300 hover:border-yellow-300 shadow-lg focus:shadow-pink-200"
    //             }`}
    //             placeholder="0x1234567890abcdef1234567890abcdef12345678"
    //             value={address}
    //             onChange={handleAddressChange}
    //           />
    //           <Link
    //             className="text-cyan-400 absolute left-3 top-1/2 -translate-y-1/2 transition-colors group-hover:text-pink-300"
    //             size={20}
    //           />
    //           {isLoading && (
    //             <div className="absolute right-3 top-1/2 -translate-y-1/2">
    //               <ClipLoader color="#f472b6" size={20} />
    //             </div>
    //           )}
    //         </div>
    //         {!isValidAddress && address && (
    //           <p className="text-red-500 text-xs">Please enter a valid Ethereum address</p>
    //         )}
    //       </div>



    //       {/* Token info card */}
    //       {apiResponse && (
    //         <div className="transform transition-all duration-300 hover:scale-102">
    //           <div className="p-2 px-4 rounded-xl bg-gradient-to-r from-cyan-50 via-pink-50 to-yellow-50 shadow-lg border border-white/50">
    //             {apiResponse.error ? (
    //               <p className="text-red-500 font-medium text-center">{apiResponse.error}</p>
    //             ) : (
    //               <div className="flex items-center space-x-4">
    //                 <div className="relative">
    //                   <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 via-pink-300 to-yellow-300 rounded-full blur-sm animate-pulse" />
    //                   <img
    //                     src={apiResponse.logoURI}
    //                     alt="Token Logo"
    //                     className="relative w-10 h-10 rounded-full border-2 border-white shadow-lg"
    //                   />
    //                 </div>
    //                 <div>
    //                   <p className="text-gray-800 font-bold">{apiResponse.name}</p>
    //                   <p className="text-gray-500 text-sm">{apiResponse.symbol}</p>
    //                 </div>
    //               </div>
    //             )}
    //           </div>
    //         </div>
    //       )}

    //       {/* Generate button */}
    //       <button
    //         className={`w-full py-3 rounded-lg font-bold transition-all duration-300 transform ${
    //           !address || !isValidAddress
    //             ? "bg-gray-300 text-gray-600 cursor-not-allowed"
    //             : "bg-gradient-to-r from-cyan-400 via-pink-300 to-yellow-300 hover:opacity-90 active:scale-95 shadow-lg hover:shadow-xl text-white hover:text-gray-800"
    //         }`}
    //         onClick={generateLink}
    //         disabled={!address || !isValidAddress}
    //       >
    //         Generate Link
    //       </button>

    //       {/* Generated link section */}
    //       {generatedLink && (
    //         <div className="space-y-4 transform transition-all duration-300">
    //           <div className="bg-white/90 backdrop-blur-sm p-2 px-4 rounded-lg break-all text-sm flex items-center justify-between border-2 border-cyan-400 shadow-lg hover:shadow-xl">
    //             <span className="truncate mr-2 text-gray-600 font-medium">
    //               {generatedLink}
    //             </span>
    //             <button
    //               onClick={copyToClipboard}
    //               className="text-cyan-400 hover:text-pink-300 transition-colors p-2 rounded-lg hover:bg-gray-50"
    //             >
    //               <Copy size={20} />
    //             </button>
    //           </div>
    //         </div>
    //       )}

    //       <p className="text-center text-xs text-gray-400">Powered by winks.fun</p>
    //     </div>
    //   </div>
    // </div>
    <div className="min-h-screen bg-gradient-to-b from-white to-blue-50 text-gray-800 outfit-font">
      {/* Navigation */}
      <nav
        className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? "bg-white/90 backdrop-blur-md shadow-sm py-3" : "bg-transparent py-5"
          }`}
      >
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center">
            <motion.div
              initial={{ rotate: 0 }}
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
              className="mr-2"
            >
              <div className="h-8 w-8 rounded-full bg-gradient-to-r from-violet-500 to-blue-400"></div>
            </motion.div>
            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-violet-600 to-blue-500">
              AggregatorX
            </span>
          </div>

          <div className="hidden md:flex space-x-8">
            <Link href="#features" className="hover:text-violet-600 transition-colors font-medium">
              Features
            </Link>
            <Link href="#integrations" className="hover:text-violet-600 transition-colors font-medium">
              Integrations
            </Link>
            <Link href="#" className="hover:text-violet-600 transition-colors font-medium">
              Docs
            </Link>
            <Link href="#" className="hover:text-violet-600 transition-colors font-medium">
              About
            </Link>
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-gradient-to-r from-violet-600 to-blue-500 px-5 py-2 rounded-full font-medium text-white shadow-lg shadow-violet-200"
          >
            Launch App
          </motion.button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-10 md:mb-0">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6 text-gray-800">
                  The Ultimate{" "}
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-violet-600 to-blue-500">
                    DEX Aggregator
                  </span>{" "}
                  Platform
                </h1>
                <p className="text-xl text-gray-600 mb-8 max-w-lg">
                  Get the best swap rates across all major decentralized exchanges with our advanced routing algorithms.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-gradient-to-r from-violet-600 to-blue-500 px-8 py-3 rounded-full font-medium text-lg text-white flex items-center justify-center shadow-lg shadow-violet-200"
                  >
                    Start Trading <FiArrowRight className="ml-2" />
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-white border border-violet-300 px-8 py-3 rounded-full font-medium text-lg text-violet-700 shadow-md"
                  >
                    View Demo
                  </motion.button>
                </div>
              </motion.div>
            </div>
            <div className="md:w-1/2">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="relative"
              >
                <div className="w-full h-[400px] relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-violet-100 to-blue-100 rounded-2xl"></div>
                  <motion.div
                    animate={{
                      boxShadow: ["0 0 0 0px rgba(139, 92, 246, 0.3)", "0 0 0 20px rgba(139, 92, 246, 0)"],
                    }}
                    transition={{
                      repeat: Number.POSITIVE_INFINITY,
                      duration: 2,
                    }}
                    className="absolute inset-0 rounded-2xl"
                  ></motion.div>

                  <div className="absolute inset-0 flex items-center justify-center">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 30, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                      className="w-64 h-64 rounded-full border-2 border-dashed border-violet-300 flex items-center justify-center"
                    >
                      <motion.div
                        animate={{ rotate: -360 }}
                        transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                        className="w-48 h-48 rounded-full border-2 border-dashed border-blue-300 flex items-center justify-center"
                      >
                        <motion.div
                          animate={{
                            scale: [1, 1.1, 1],
                          }}
                          transition={{
                            duration: 3,
                            repeat: Number.POSITIVE_INFINITY,
                            ease: "easeInOut",
                          }}
                          className="w-32 h-32 rounded-full bg-gradient-to-r from-violet-500 to-blue-500 flex items-center justify-center shadow-xl"
                        >
                          <FiGlobe className="text-white h-16 w-16" />
                        </motion.div>
                      </motion.div>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-10">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center"
          >
            <div className="bg-white shadow-lg rounded-xl p-6">
              <p className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-violet-600 to-blue-500">
                $2B+
              </p>
              <p className="text-gray-600 mt-2">Trading Volume</p>
            </div>
            <div className="bg-white shadow-lg rounded-xl p-6">
              <p className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-violet-600 to-blue-500">
                15+
              </p>
              <p className="text-gray-600 mt-2">DEXes Integrated</p>
            </div>
            <div className="bg-white shadow-lg rounded-xl p-6">
              <p className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-violet-600 to-blue-500">
                50K+
              </p>
              <p className="text-gray-600 mt-2">Active Users</p>
            </div>
            <div className="bg-white shadow-lg rounded-xl p-6">
              <p className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-violet-600 to-blue-500">
                30%
              </p>
              <p className="text-gray-600 mt-2">Average Savings</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-4 text-gray-800">Advanced Algorithm Implementations</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Our platform leverages cutting-edge algorithms to deliver the best trading experience in DeFi.
            </p>
          </motion.div>

          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 gap-8"
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                variants={item}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
                className="bg-white rounded-xl p-8 border border-violet-100 shadow-lg"
              >
                <div className="mb-4 text-violet-600">{feature.icon}</div>
                <h3 className="text-2xl font-bold mb-3 text-gray-800">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-gradient-to-r from-violet-50 to-blue-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-4 text-gray-800">How AggregatorX Works</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Our platform analyzes all possible routes across DEXes to find you the best rates in milliseconds.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="bg-violet-100 rounded-full h-20 w-20 flex items-center justify-center mx-auto mb-6">
                <FiCode className="h-10 w-10 text-violet-600" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-800">1. Connect Wallet</h3>
              <p className="text-gray-600">
                Connect your wallet to access our platform and start trading with the best rates.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="bg-blue-100 rounded-full h-20 w-20 flex items-center justify-center mx-auto mb-6">
                <FiCpu className="h-10 w-10 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-800">2. Select Tokens</h3>
              <p className="text-gray-600">
                Choose the tokens you want to swap and our algorithm will find the best route.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="bg-violet-100 rounded-full h-20 w-20 flex items-center justify-center mx-auto mb-6">
                <FiZap className="h-10 w-10 text-violet-600" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-800">3. Execute Swap</h3>
              <p className="text-gray-600">
                Review the route and execute your swap with the best rates and lowest gas fees.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Integrations Section */}
      <section id="integrations" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-4 text-gray-800">Integrated DEX Platforms</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              We aggregate liquidity from all major decentralized exchanges to ensure you get the best rates.
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="show"
            variants={container}
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8"
          >
            {dexLogos.map((dex, index) => (
              <motion.div
                key={index}
                variants={item}
                whileHover="hover"
                initial="rest"
                className="flex flex-col items-center"
              >
                <motion.div
                  variants={logoAnimation}
                  className="bg-white shadow-md p-6 rounded-xl border border-violet-100 mb-3 w-full flex items-center justify-center"
                >
                  <Image
                    src={dex.logo || "/placeholder.svg"}
                    alt={dex.name}
                    width={80}
                    height={80}
                    className="h-16 w-16 object-contain"
                  />
                </motion.div>
                <p className="text-gray-700">{dex.name}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-violet-100 to-blue-100">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-5xl font-bold mb-6 text-gray-800">
                Ready to experience the future of DeFi trading?
              </h2>
              <p className="text-xl text-gray-600 mb-8">
                Join thousands of traders who are already saving on fees and getting better rates with AggregatorX.
              </p>
            
              <div className="relative w-full max-w-md mx-auto">
                {/* Card glow effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 via-pink-300 to-yellow-300 rounded-2xl blur opacity-70 animate-pulse" />

                {/* Main card */}
                <div className="relative bg-white backdrop-blur-md shadow-2xl rounded-2xl p-6 space-y-3 border border-white">
                  <div className="text-center">
                    <p className="text-gray-600 font-medium">Enter BNB contract address to generate a sharable link</p>
                  </div>

                  {/* Input section */}
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                      BNB Contract Address
                    </label>
                    <div className="relative group">
                      <input
                        className={`w-full p-3 pl-10 rounded-lg bg-white/90 focus:outline-none border-2 transition-all duration-300 ${!isValidAddress
                            ? "border-red-500 shadow-red-200"
                            : "border-cyan-400 focus:border-pink-300 hover:border-yellow-300 shadow-lg focus:shadow-pink-200"
                          }`}
                        placeholder="0x1234567890abcdef1234567890abcdef12345678"
                        value={address}
                        onChange={handleAddressChange}
                      />
                      <Link2
                        className="text-cyan-400 absolute left-3 top-1/2 -translate-y-1/2 transition-colors group-hover:text-pink-300"
                        size={20}
                      />
                      {isLoading && (
                        <div className="absolute right-3 top-1/2 -translate-y-1/2">
                          <ClipLoader color="#f472b6" size={20} />
                        </div>
                      )}
                    </div>
                    {!isValidAddress && address && (
                      <p className="text-red-500 text-xs">Please enter a valid Ethereum address</p>
                    )}
                  </div>



                  {/* Token info card */}
                  {apiResponse && (
                    <div className="transform transition-all duration-300 hover:scale-102">
                      <div className="p-2 px-4 rounded-xl bg-gradient-to-r from-cyan-50 via-pink-50 to-yellow-50 shadow-lg border border-white/50">
                        {apiResponse.error ? (
                          <p className="text-red-500 font-medium text-center">{apiResponse.error}</p>
                        ) : (
                          <div className="flex items-center space-x-4">
                            <div className="relative">
                              <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 via-pink-300 to-yellow-300 rounded-full blur-sm animate-pulse" />
                              <img
                                src={apiResponse.logoURI}
                                alt="Token Logo"
                                className="relative w-10 h-10 rounded-full border-2 border-white shadow-lg"
                              />
                            </div>
                            <div>
                              <p className="text-gray-800 font-bold">{apiResponse.name}</p>
                              <p className="text-gray-500 text-sm">{apiResponse.symbol}</p>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Generate button */}
                  <button
                    className={`w-full py-3 rounded-lg font-bold transition-all duration-300 transform ${!address || !isValidAddress
                        ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                        : "bg-gradient-to-r from-cyan-400 via-pink-300 to-yellow-300 hover:opacity-90 active:scale-95 shadow-lg hover:shadow-xl text-white hover:text-gray-800"
                      }`}
                    onClick={generateLink}
                    disabled={!address || !isValidAddress}
                  >
                    Generate Link
                  </button>

                  {/* Generated link section */}
                  {generatedLink && (
                    <div className="space-y-4 transform transition-all duration-300">
                      <div className="bg-white/90 backdrop-blur-sm p-2 px-4 rounded-lg break-all text-sm flex items-center justify-between border-2 border-cyan-400 shadow-lg hover:shadow-xl">
                        <span className="truncate mr-2 text-gray-600 font-medium">
                          {generatedLink}
                        </span>
                        <button
                          onClick={copyToClipboard}
                          className="text-cyan-400 hover:text-pink-300 transition-colors p-2 rounded-lg hover:bg-gray-50"
                        >
                          <Copy size={20} />
                        </button>
                      </div>
                    </div>
                  )}

                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-white border-t border-gray-100">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center mb-4">
                <div className="h-8 w-8 rounded-full bg-gradient-to-r from-violet-600 to-blue-400 mr-2"></div>
                <span className="text-xl font-bold text-gray-800">AggregatorX</span>
              </div>
              <p className="text-gray-600 mb-4">
                The ultimate DEX aggregator with advanced algorithms for the best swap rates.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-500 hover:text-violet-600">
                  <span className="sr-only">Twitter</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </a>
                <a href="#" className="text-gray-500 hover:text-violet-600">
                  <span className="sr-only">GitHub</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path
                      fillRule="evenodd"
                      d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
                <a href="#" className="text-gray-500 hover:text-violet-600">
                  <span className="sr-only">Discord</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path
                      fillRule="evenodd"
                      d="M18.942 5.556a16.299 16.299 0 00-4.126-1.297c-.178.321-.385.754-.529 1.097a15.175 15.175 0 00-4.573 0 11.583 11.583 0 00-.535-1.097 16.274 16.274 0 00-4.129 1.3c-2.611 3.946-3.319 7.794-2.965 11.587a16.494 16.494 0 005.061 2.593 12.65 12.65 0 001.084-1.785 10.689 10.689 0 01-1.707-.831c.143-.106.283-.217.418-.331 3.291 1.539 6.866 1.539 10.118 0 .137.114.277.225.418.331-.541.326-1.114.606-1.71.832a12.52 12.52 0 001.084 1.785 16.46 16.46 0 005.064-2.595c.415-4.396-.709-8.209-2.973-11.589zM8.678 14.813c-.988 0-1.798-.922-1.798-2.045s.793-2.047 1.798-2.047 1.815.922 1.798 2.047c.001 1.123-.793 2.045-1.798 2.045zm6.644 0c-.988 0-1.798-.922-1.798-2.045s.793-2.047 1.798-2.047 1.815.922 1.798 2.047c0 1.123-.793 2.045-1.798 2.045z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4 text-gray-800">Product</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-gray-600 hover:text-violet-600">
                    Features
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-600 hover:text-violet-600">
                    Roadmap
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-600 hover:text-violet-600">
                    Pricing
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-600 hover:text-violet-600">
                    Changelog
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4 text-gray-800">Resources</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-gray-600 hover:text-violet-600">
                    Documentation
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-600 hover:text-violet-600">
                    API Reference
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-600 hover:text-violet-600">
                    Tutorials
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-600 hover:text-violet-600">
                    Blog
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4 text-gray-800">Company</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-gray-600 hover:text-violet-600">
                    About
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-600 hover:text-violet-600">
                    Careers
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-600 hover:text-violet-600">
                    Contact
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-600 hover:text-violet-600">
                    Partners
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-100 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-500">© {new Date().getFullYear()} AggregatorX. All rights reserved.</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-gray-500 hover:text-violet-600">
                Privacy Policy
              </a>
              <a href="#" className="text-gray-500 hover:text-violet-600">
                Terms of Service
              </a>
              <a href="#" className="text-gray-500 hover:text-violet-600">
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}