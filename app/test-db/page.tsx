"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"

export default function TestDBPage() {
  const [results, setResults] = useState<any>({})
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function runTests() {
      const tests: any = {}

      // Test 1: Check environment variables
      tests.envCheck = {
        hasUrl: !!process.env.NEXT_PUBLIC_SUPABASE_URL,
        hasKey: !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
        url: process.env.NEXT_PUBLIC_SUPABASE_URL?.substring(0, 30) + '...',
        keyPrefix: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.substring(0, 20) + '...'
      }

      // Test 2: Check Supabase client
      tests.clientCheck = {
        clientExists: !!supabase,
        clientType: typeof supabase
      }

      // Test 3: Try to fetch from listings table
      try {
        const { data: listingsData, error: listingsError } = await supabase
          .from('listings')
          .select('count')
          .limit(1)

        tests.listingsTable = {
          success: !listingsError,
          error: listingsError ? JSON.stringify(listingsError, null, 2) : null,
          data: listingsData
        }
      } catch (err) {
        tests.listingsTable = {
          success: false,
          error: String(err)
        }
      }

      // Test 4: Try to fetch from businesses table
      try {
        const { data: businessesData, error: businessesError } = await supabase
          .from('businesses')
          .select('count')
          .limit(1)

        tests.businessesTable = {
          success: !businessesError,
          error: businessesError ? JSON.stringify(businessesError, null, 2) : null,
          data: businessesData
        }
      } catch (err) {
        tests.businessesTable = {
          success: false,
          error: String(err)
        }
      }

      // Test 5: List all tables (this might fail with RLS)
      try {
        const { data: tablesData, error: tablesError } = await supabase
          .rpc('get_tables')

        tests.tablesList = {
          success: !tablesError,
          error: tablesError ? JSON.stringify(tablesError, null, 2) : null,
          data: tablesData
        }
      } catch (err) {
        tests.tablesList = {
          success: false,
          error: String(err),
          note: "This is expected to fail - RPC not defined"
        }
      }

      setResults(tests)
      setLoading(false)
    }

    runTests()
  }, [])

  return (
    <div className="min-h-screen p-8 bg-background">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Supabase Connection Test</h1>

        {loading ? (
          <p>Running tests...</p>
        ) : (
          <div className="space-y-6">
            {Object.entries(results).map(([testName, testResult]: [string, any]) => (
              <div key={testName} className="border rounded-lg p-4 bg-card">
                <h2 className="text-xl font-semibold mb-2 capitalize">
                  {testName.replace(/([A-Z])/g, ' $1').trim()}
                </h2>
                <pre className="bg-muted p-4 rounded overflow-auto text-sm">
                  {JSON.stringify(testResult, null, 2)}
                </pre>
                {testResult.success === true && (
                  <div className="mt-2 text-green-600 font-semibold">✅ PASS</div>
                )}
                {testResult.success === false && (
                  <div className="mt-2 text-red-600 font-semibold">❌ FAIL</div>
                )}
              </div>
            ))}
          </div>
        )}

        <div className="mt-8 p-4 border rounded-lg bg-card">
          <h2 className="text-xl font-semibold mb-2">Quick Fixes</h2>
          <ul className="space-y-2 text-sm">
            <li>
              <strong>If envCheck fails:</strong> Check your .env.local file has NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY
            </li>
            <li>
              <strong>If listingsTable fails:</strong> Run the 001_create_listings_table.sql migration in Supabase SQL Editor
            </li>
            <li>
              <strong>If businessesTable fails:</strong> Run the 002_create_businesses_table.sql migration in Supabase SQL Editor
            </li>
            <li>
              <strong>If connection timeout:</strong> Check your Supabase URL is correct and project is active
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}
