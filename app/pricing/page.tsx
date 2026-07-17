"use client";

import { useUser } from "@clerk/nextjs";
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import NavigationHeader from "@/components/NavigationHeader";
import ProPlanView from "./_components/ProPlanView";
import { ENTERPRISE_FEATURES, FEATURES } from "./_constants";
import UpgradeButton from "./_components/UpgradeButton";
import LoginButton from "@/components/LoginButton";
import { Check, Sparkles, X, Zap } from "lucide-react";

export default function PricingPage() {
  const { user, isSignedIn } = useUser();
  const convexUser = useQuery(api.users.getUser, {
    userId: user?.id || "",
  });

  // If user is pro, show the ProPlanView
  if (convexUser?.isPro) {
    return <ProPlanView />;
  }

  return (
    <div className="min-h-screen bg-[#0a0a0f]">
      <NavigationHeader />

      <div className="relative max-w-7xl mx-auto px-4 py-12 sm:py-20">
        {/* Hero Section */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-amber-500/10 to-orange-500/10 border border-amber-500/20 text-sm text-amber-400 mb-6">
            <Sparkles className="w-4 h-4" />
            Simple, transparent pricing
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-100 to-gray-300 text-transparent bg-clip-text mb-4 sm:mb-6">
            Choose Your Plan
          </h1>
          <p className="text-base sm:text-lg text-gray-400 max-w-xl mx-auto">
            Start free, upgrade when you need more power. No hidden fees, cancel anytime.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 max-w-4xl mx-auto mb-16 sm:mb-24">
          {/* Free Plan */}
          <div className="relative group">
            <div className="relative bg-[#12121a]/90 border border-gray-800/50 rounded-2xl p-6 sm:p-8 h-full backdrop-blur-xl transition-all duration-300 hover:border-gray-700/50">
              <div className="absolute inset-0 bg-gradient-to-br from-gray-500/[0.03] to-blue-500/[0.03] rounded-2xl" />
              <div className="relative">
                <div className="mb-6 sm:mb-8">
                  <h3 className="text-xl font-semibold text-white mb-2">Free</h3>
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl sm:text-5xl font-bold text-white">$0</span>
                    <span className="text-gray-500">/month</span>
                  </div>
                  <p className="text-gray-400 mt-3 text-sm">Perfect for getting started with code editing</p>
                </div>

                <div className="space-y-4 mb-8">
                  <div className="flex items-center gap-3">
                    <div className="flex-shrink-0 w-5 h-5 rounded-full bg-blue-500/10 flex items-center justify-center border border-blue-500/20">
                      <Check className="w-3 h-3 text-blue-400" />
                    </div>
                    <span className="text-gray-300 text-sm">Run code in C++</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex-shrink-0 w-5 h-5 rounded-full bg-blue-500/10 flex items-center justify-center border border-blue-500/20">
                      <Check className="w-3 h-3 text-blue-400" />
                    </div>
                    <span className="text-gray-300 text-sm">Save & share snippets</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex-shrink-0 w-5 h-5 rounded-full bg-blue-500/10 flex items-center justify-center border border-blue-500/20">
                      <Check className="w-3 h-3 text-blue-400" />
                    </div>
                    <span className="text-gray-300 text-sm">Community snippets access</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex-shrink-0 w-5 h-5 rounded-full bg-blue-500/10 flex items-center justify-center border border-blue-500/20">
                      <Check className="w-3 h-3 text-blue-400" />
                    </div>
                    <span className="text-gray-300 text-sm">Basic theme selection</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex-shrink-0 w-5 h-5 rounded-full bg-gray-800/50 flex items-center justify-center border border-gray-700/30">
                      <X className="w-3 h-3 text-gray-600" />
                    </div>
                    <span className="text-gray-600 text-sm">Multi-language support</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex-shrink-0 w-5 h-5 rounded-full bg-gray-800/50 flex items-center justify-center border border-gray-700/30">
                      <X className="w-3 h-3 text-gray-600" />
                    </div>
                    <span className="text-gray-600 text-sm">Advanced AI features</span>
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-800/50">
                  {isSignedIn ? (
                    <div className="inline-flex items-center justify-center gap-2 w-full px-6 py-3 text-gray-400 bg-gray-800/50 rounded-xl border border-gray-700/50 text-sm font-medium">
                      Current Plan
                    </div>
                  ) : (
                    <LoginButton />
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Pro Plan */}
          <div className="relative group">
            {/* Glow effect */}
            <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500/30 to-purple-500/30 rounded-2xl blur-lg opacity-50 group-hover:opacity-75 transition-opacity duration-500" />

            <div className="relative bg-[#12121a]/90 border border-blue-500/20 rounded-2xl p-6 sm:p-8 h-full backdrop-blur-xl transition-all duration-300 group-hover:border-blue-500/40">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/[0.05] to-purple-500/[0.05] rounded-2xl" />

              {/* Popular badge */}
              <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                <div className="flex items-center gap-1 px-3 py-1 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 text-white text-xs font-semibold shadow-lg shadow-blue-500/25">
                  <Zap className="w-3 h-3" />
                  Most Popular
                </div>
              </div>

              <div className="relative">
                <div className="mb-6 sm:mb-8">
                  <h3 className="text-xl font-semibold text-white mb-2">Pro</h3>
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 text-transparent bg-clip-text">$9</span>
                    <span className="text-gray-500">/month</span>
                  </div>
                  <p className="text-gray-400 mt-3 text-sm">For serious developers who want it all</p>
                </div>

                <div className="space-y-4 mb-8">
                  <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">Everything in Free, plus:</p>
                  {FEATURES.development.map((feature) => (
                    <div key={feature} className="flex items-center gap-3">
                      <div className="flex-shrink-0 w-5 h-5 rounded-full bg-blue-500/10 flex items-center justify-center border border-blue-500/30">
                        <Check className="w-3 h-3 text-blue-400" />
                      </div>
                      <span className="text-gray-300 text-sm">{feature}</span>
                    </div>
                  ))}
                  {FEATURES.collaboration.map((feature) => (
                    <div key={feature} className="flex items-center gap-3">
                      <div className="flex-shrink-0 w-5 h-5 rounded-full bg-purple-500/10 flex items-center justify-center border border-purple-500/30">
                        <Check className="w-3 h-3 text-purple-400" />
                      </div>
                      <span className="text-gray-300 text-sm">{feature}</span>
                    </div>
                  ))}
                  {FEATURES.deployment.map((feature) => (
                    <div key={feature} className="flex items-center gap-3">
                      <div className="flex-shrink-0 w-5 h-5 rounded-full bg-emerald-500/10 flex items-center justify-center border border-emerald-500/30">
                        <Check className="w-3 h-3 text-emerald-400" />
                      </div>
                      <span className="text-gray-300 text-sm">{feature}</span>
                    </div>
                  ))}
                </div>

                <div className="pt-4 border-t border-gray-800/50">
                  {isSignedIn ? (
                    <UpgradeButton />
                  ) : (
                    <LoginButton />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Enterprise Features Section */}
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">Enterprise-Grade Infrastructure</h2>
            <p className="text-gray-400 max-w-lg mx-auto">
              Built on robust infrastructure to power your development workflow
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {ENTERPRISE_FEATURES.map((feature) => (
              <div
                key={feature.label}
                className="group relative bg-[#12121a]/60 border border-gray-800/50 rounded-xl p-5 sm:p-6 hover:border-gray-700/50 transition-all duration-300"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/[0.03] to-purple-500/[0.03] rounded-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative">
                  <div className="inline-flex p-3 rounded-xl bg-gradient-to-br from-blue-500/10 to-purple-500/10 ring-1 ring-gray-800/60 mb-4 group-hover:scale-110 transition-transform duration-300">
                    <feature.icon className="w-5 h-5 text-blue-400" />
                  </div>
                  <h3 className="text-white font-medium mb-1.5">{feature.label}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}