"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Copy, ArrowRightLeft, Lock, Unlock, Sparkles } from "lucide-react"
import { BaoBaoCipher } from "@/lib/baobao-cipher"

export function BaoBaoCipherTool() {
  const [encodeInput, setEncodeInput] = useState("")
  const [decodeInput, setDecodeInput] = useState("")
  const [encodeOutput, setEncodeOutput] = useState("")
  const [decodeOutput, setDecodeOutput] = useState("")
  const [isEncoding, setIsEncoding] = useState(false)
  const [isDecoding, setIsDecoding] = useState(false)

  const handleEncode = async () => {
    if (!encodeInput.trim()) return

    setIsEncoding(true)
    try {
      const encoded = BaoBaoCipher.encode(encodeInput)
      setEncodeOutput(encoded)
    } catch (error) {
      setEncodeOutput("编码失败")
    }
    setIsEncoding(false)
  }

  const handleDecode = async () => {
    if (!decodeInput.trim()) return

    setIsDecoding(true)
    try {
      const decoded = BaoBaoCipher.decode(decodeInput)
      if (decoded.startsWith("解码失败")) {
        setDecodeOutput("解码失败")
      } else {
        setDecodeOutput(decoded)
      }
    } catch (error) {
      setDecodeOutput("解码失败")
    }
    setIsDecoding(false)
  }

  const handleCopyEncode = async () => {
    if (encodeOutput) {
      await navigator.clipboard.writeText(encodeOutput)
    }
  }

  const handleCopyDecode = async () => {
    if (decodeOutput) {
      await navigator.clipboard.writeText(decodeOutput)
    }
  }

  const handleSwapToDecode = () => {
    setDecodeInput(encodeOutput)
    setDecodeOutput("")
  }

  const handleSwapToEncode = () => {
    setEncodeInput(decodeOutput)
    setEncodeOutput("")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-50">
      <div className="container mx-auto px-4 py-12 max-w-7xl">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-4 mb-6">
            <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-500 bg-clip-text text-transparent">
              宝宝语加解密在线工具
            </h1>
          </div>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            啊啊啊啊宝宝你是一个宝宝
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader className="pb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Lock className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <CardTitle className="text-2xl font-bold text-slate-800">编码人话</CardTitle>
                  <CardDescription className="text-slate-600">将人话转换为宝宝语格式</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-3">
                <label className="text-sm font-semibold text-slate-700">输入人话</label>
                <Textarea
                  placeholder="在这里输入您想要编码的文本..."
                  value={encodeInput}
                  onChange={(e) => setEncodeInput(e.target.value)}
                  className="min-h-32 bg-white border-slate-200 focus:border-blue-400 focus:ring-blue-400/20 resize-none text-slate-700"
                />
              </div>

              <Button
                onClick={handleEncode}
                disabled={!encodeInput.trim() || isEncoding}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
                size="lg"
              >
                {isEncoding ? "编码中..." : "开始编码"}
              </Button>

              {encodeOutput && (
                <div className="space-y-4 pt-6 border-t border-slate-200">
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-semibold text-slate-700">编码结果</label>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={handleSwapToDecode}
                        className="text-slate-600 border-slate-300 hover:bg-slate-50 bg-transparent"
                      >
                        <ArrowRightLeft className="w-4 h-4 mr-2" />
                        转到解码
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={handleCopyEncode}
                        className="text-slate-600 border-slate-300 hover:bg-slate-50 bg-transparent"
                      >
                        <Copy className="w-4 h-4 mr-2" />
                        复制
                      </Button>
                    </div>
                  </div>

                  <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                    <p className="text-sm text-slate-700 whitespace-pre-wrap break-all leading-relaxed">
                      {encodeOutput}
                    </p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader className="pb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-cyan-100 rounded-lg flex items-center justify-center">
                  <Unlock className="w-5 h-5 text-cyan-600" />
                </div>
                <div>
                  <CardTitle className="text-2xl font-bold text-slate-800">宝宝语解码</CardTitle>
                  <CardDescription className="text-slate-600">将宝宝语格式还原为人话</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-3">
                <label className="text-sm font-semibold text-slate-700">输入宝宝语</label>
                <Textarea
                  placeholder="在这里输入宝宝语格式的文本..."
                  value={decodeInput}
                  onChange={(e) => setDecodeInput(e.target.value)}
                  className="min-h-32 bg-white border-slate-200 focus:border-cyan-400 focus:ring-cyan-400/20 resize-none text-slate-700"
                />
              </div>

              <Button
                onClick={handleDecode}
                disabled={!decodeInput.trim() || isDecoding}
                className="w-full bg-cyan-600 hover:bg-cyan-700 text-white font-semibold py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
                size="lg"
              >
                {isDecoding ? "解码中..." : "开始解码"}
              </Button>

              {decodeOutput && (
                <div className="space-y-4 pt-6 border-t border-slate-200">
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-semibold text-slate-700">解码结果</label>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={handleSwapToEncode}
                        className="text-slate-600 border-slate-300 hover:bg-slate-50 bg-transparent"
                      >
                        <ArrowRightLeft className="w-4 h-4 mr-2" />
                        转到编码
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={handleCopyDecode}
                        className="text-slate-600 border-slate-300 hover:bg-slate-50 bg-transparent"
                      >
                        <Copy className="w-4 h-4 mr-2" />
                        复制
                      </Button>
                    </div>
                  </div>

                  <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                    <p className="text-sm text-slate-700 whitespace-pre-wrap break-all leading-relaxed">
                      {decodeOutput}
                    </p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <Card className="mt-12 bg-white/60 backdrop-blur-sm border-0 shadow-lg">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold text-slate-800">关于此项目</CardTitle>
            <CardDescription className="text-slate-600">由 ZackMount 开发</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center space-y-6">
              <div className="w-24 h-24 rounded-full overflow-hidden shadow-lg">
                 <img
                    src="https://avatars.githubusercontent.com/u/118198354?v=4"
                    alt="Developer Avatar"
                    width="96"
                    height="96"
                    className="object-cover w-full h-full"
                  />
              </div>

              <div className="text-center space-y-3">
                <h3 className="text-xl font-bold text-slate-800">宝宝语加解密在线工具</h3>
                <p className="text-slate-600 max-w-md leading-relaxed">
                   仅供娱乐，不代表本人立场。
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
                  <Button
                    variant="outline"
                    className="bg-slate-800 text-white border-slate-800 hover:bg-slate-900 hover:border-slate-900"
                    onClick={() => window.open("https://github.com/ZackMount/baobao-cipher-tool", "_blank")}
                  >
                    <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                    </svg>
                    访问 GitHub
                  </Button>

                  <div className="flex items-center gap-4 text-sm text-slate-500">
                    <span className="flex items-center gap-1">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      TypeScript
                    </span>
                    <span className="flex items-center gap-1">
                      <div className="w-2 h-2 bg-cyan-500 rounded-full"></div>
                      React
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
