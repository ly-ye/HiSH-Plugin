# HiSH Linux 虚拟机 - Operit AI 插件

> 在 Operit AI 里跑 Linux，不需要系统终端

---

## 📦 这是什么

一个 Operit AI 插件，装上后就能在手机上跑 Linux 虚拟机。

- ✅ 不依赖系统终端（通过 Java Bridge 直接启动 QEMU）
- ✅ 支持端口转发、共享文件夹、VNC 远程桌面
- ✅ 21 个工具，完整虚拟机生命周期管理

---

## 🚀 3 步搞定

### 第 1 步：下载 3 个文件

去 [HiSH Releases](https://github.com/harmoninux/HiSH/releases) 下载：

| 文件 | 说明 |
|------|------|
| `qemu-system-aarch64` | QEMU 虚拟机引擎 |
| `Image` | Linux 内核 |
| `rootfs.qcow2` | Alpine Linux 系统 |

把这 3 个文件和本仓库的 `index.js` 一起放到手机 `Download` 文件夹。

### 第 2 步：导入插件

1. 打开 **Operit AI**
2. 我的 → 插件管理 → 导入插件
3. 选择 `index.js`
4. 启用

### 第 3 步：开始用

对 Operit AI 说：

```
创建一个名叫 mylinux 的模拟器，根文件系统路径 /sdcard/Download/rootfs.qcow2，内核路径 /sdcard/Download/Image
```

```
启动模拟器
```

```
在模拟器里执行 uname -a
```

---

## 💡 常用操作

| 你想做什么 | 怎么说 |
|-----------|--------|
| 看系统信息 | `获取模拟器的系统信息` |
| 看进程 | `获取模拟器的进程列表` |
| 装软件 | `在模拟器里安装 python3` |
| 开 VNC | `为模拟器配置 VNC，启用，端口模式 lan` |
| 端口转发 | `为模拟器配置端口转发：主机 8022 转发到客户机 22` |
| 关虚拟机 | `停止模拟器` |

---

## 📁 目录结构

```
.
├── index.js          ← 直接导入这个（成品）
├── src/
│   ├── index.js      ← 和根目录一样（备份）
│   └── index.ts      ← TypeScript 源码（开发者看）
└── README.md         ← 你正在看的
```

---

## ⚠️ 注意

- 手机 CPU 必须是 ARM64（现在的手机基本都是）
- Operit AI 目前只支持 Android 8+，鸿蒙6等官方更新
- QEMU 二进制必须是 ARM64 版本的
