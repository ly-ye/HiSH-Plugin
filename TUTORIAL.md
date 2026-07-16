# HiSH Linux 虚拟机管理器 - Operit AI 插件使用教程

> 基于 [HiSH](https://github.com/harmoninux/HiSH) 开源项目架构，通过 Java Bridge 直接启动 QEMU 进程。
> **不依赖系统终端**，适用于 Android 8+ 和鸿蒙等无系统 Shell 的环境。

---

## 目录

1. [环境准备](#1-环境准备)
2. [插件导入](#2-插件导入)
3. [快速开始](#3-快速开始)
4. [核心功能详解](#4-核心功能详解)
5. [高级功能](#5-高级功能)
6. [故障排查](#6-故障排查)

---

## 1. 环境准备

### 1.1 宿主机要求

| 项目 | 要求 |
|------|------|
| 操作系统 | Android 8.0+ / 鸿蒙（支持 Operit AI 运行的环境） |
| CPU 架构 | ARM64（AArch64） |
| Operit AI | 已安装并可正常运行 |
| 系统终端 | **不需要！** 插件通过 Java Bridge 直接管理进程 |
| 存储 | 建议 2GB 可用空间（内核 + 根文件系统 + 磁盘镜像） |

### 1.2 获取 QEMU 二进制文件

插件需要 `qemu-system-aarch64` 二进制文件。获取方式：

1. **从 HiSH 项目获取**（推荐）：
   - 下载 [HiSH Release](https://github.com/harmoninux/HiSH/releases) 中的 QEMU 二进制
   - 将 `qemu-system-aarch64` 放到设备可访问的目录（如 `/sdcard/Download/`）

2. **自行编译**：
   ```bash
   git clone https://github.com/nicholasgasior/qemu
   cd qemu
   ./configure --target-list=aarch64-softmmu --static
   make -j$(nproc)
   ```

### 1.3 获取内核和根文件系统

1. **内核镜像**（Image）：
   - 从 HiSH Release 下载 `Image` 内核文件
   - 或从 [Alpine Linux](https://alpinelinux.org/) 获取 ARM64 内核

2. **根文件系统**（rootfs.qcow2）：
   - 从 HiSH Release 下载预制的 Alpine Linux rootfs
   - 或使用 `qemu-img create -f qcow2 rootfs.qcow2 2G` 创建空磁盘后安装

### 1.4 架构说明

```
┌─────────────────────────────────────────────┐
│           Operit AI (宿主应用)               │
│  ┌──────────────────────────────────────┐   │
│  │      HiSH 插件 (index.js)            │   │
│  │  ┌─────────────┐  ┌───────────────┐  │   │
│  │  │ Java Bridge │  │ Tools.Files   │  │   │
│  │  │ ProcessBuilder│ │ Tools.System  │  │   │
│  │  │ LocalSocket │  │               │  │   │
│  │  └──────┬──────┘  └───────────────┘  │   │
│  └─────────┼────────────────────────────┘   │
│            │                                 │
│  ┌─────────▼─────────────────────────────┐  │
│  │    qemu-system-aarch64 (子进程)        │  │
│  │  ┌─────────┐  ┌──────┐  ┌──────────┐  │  │
│  │  │Serial   │  │ QMP  │  │ VNC      │  │  │
│  │  │Socket   │  │Socket│  │ :5900    │  │  │
│  │  └────┬────┘  └──┬───┘  └──────────┘  │  │
│  │       │          │                     │  │
│  │  ┌────▼──────────▼─────────────────┐  │  │
│  │  │    Linux VM (Alpine/ARM64)      │  │  │
│  │  │  - Shell (通过串口控制台)        │  │  │
│  │  │  - virtio-9p 共享文件夹          │  │  │
│  │  │  - 端口转发 (hostfwd)           │  │  │
│  │  └────────────────────────────────┘  │  │
│  └───────────────────────────────────────┘  │
└─────────────────────────────────────────────┘
```

**关键设计**：插件完全不依赖系统 Shell/终端，所有操作通过：
- `Java.type("java.lang.ProcessBuilder")` — 启动/停止 QEMU 进程
- `Java.type("android.net.LocalSocket")` — 连接 QEMU 串口/QMP Socket
- `Tools.Files.*` — 文件操作
- `Tools.System.sleep()` — 等待

---

## 2. 插件导入

### 2.1 导入步骤

1. 将 `hish-operit-plugin/src/index.js` 传到设备
2. 打开 **Operit AI** → **插件管理** → **导入插件**
3. 选择 `index.js` 文件
4. 确认显示 **"HiSH Linux 虚拟机管理器"** 后启用

### 2.2 验证导入

对 Operit AI 说：
> "列出所有模拟器"

如果插件正常加载，会返回空列表（因为还没创建过模拟器）。

---

## 3. 快速开始

### 3.1 创建模拟器

对 Operit AI 说：
> "创建一个名为 myvm 的模拟器，CPU 2核，内存 1024MB，根文件系统路径 /sdcard/Download/rootfs.qcow2，内核路径 /sdcard/Download/Image"

### 3.2 配置端口转发（可选）

> "为模拟器 emu_xxx 配置端口转发：主机 8022 转发到客户机 22"

这样可以通过 SSH 连接虚拟机。

### 3.3 启动虚拟机

> "启动模拟器 emu_xxx"

插件会：
1. 构建 QEMU 命令行（对齐 HiSH startVm.ets 参数）
2. 清理旧 Socket 文件
3. 通过 `ProcessBuilder.start()` 启动 QEMU 进程
4. 等待 4 秒后检测进程存活
5. 检测 QMP Socket 就绪（最多 5 秒）
6. 返回启动状态

### 3.4 执行命令

> "在模拟器 emu_xxx 中执行 uname -a"

插件会通过 `android.net.LocalSocket` 连接 QEMU 串口控制台，发送命令并读取输出。

### 3.5 停止虚拟机

> "停止模拟器 emu_xxx"

插件会：
1. 通过 QMP 发送 `quit` 命令优雅关闭
2. 如果 2 秒后进程仍存活，调用 `Process.destroy()`（SIGTERM）
3. 如果再 1 秒后仍存活，调用 `destroyForcibly()`（SIGKILL）

---

## 4. 核心功能详解

### 4.1 串口控制台通信

插件通过 `android.net.LocalSocket` 连接 QEMU 的 Unix Domain Socket 串口：

```
QEMU: -serial unix:/path/serial.sock,server,nowait
插件: LocalSocket → connect(serial.sock) → write(command) → read(output)
```

每次执行命令时：
1. 连接串口 Socket
2. 发送命令 + `echo ___CMD_END_xxx___`（结束标记）
3. 读取输出直到遇到标记或超时
4. 自动过滤命令回显和提示符
5. 关闭 Socket

### 4.2 端口转发

QEMU 用户模式网络的 `hostfwd` 参数实现端口转发：

```
-netdev user,id=eth0,hostfwd=tcp::8022-:22,hostfwd=tcp::8080-:80
```

- 主机 8022 → 客户机 22（SSH）
- 主机 8080 → 客户机 80（Web）

**注意**：端口转发在创建/修改后需要重启虚拟机才能生效。

### 4.3 共享文件夹（virtio-9p）

QEMU 通过 virtio-9p 实现 host-guest 文件共享：

```
-fsdev local,security_model=mapped-file,id=fsdev0,path=/shared
-device virtio-9p-pci,id=fs0,fsdev=fsdev0,mount_tag=hostshare
```

在虚拟机内挂载：
```bash
mkdir -p /mnt/host
mount -t 9p -o trans=virtio hostshare /mnt/host
```

### 4.4 VNC 远程桌面

启用 VNC 后，QEMU 添加显示设备：
```
-vnc 127.0.0.1:0
-device virtio-gpu-pci
-device virtio-keyboard-pci
-device virtio-tablet-pci
```

连接方式：
- 本地模式：VNC 客户端连接 `127.0.0.1:5900`
- 局域网模式：VNC 客户端连接 `设备IP:5900`

---

## 5. 高级功能

### 5.1 额外磁盘

> "为模拟器 emu_xxx 添加磁盘 /sdcard/Download/data.qcow2"

QEMU 会将额外磁盘作为 SCSI 设备挂载。在虚拟机内：
```bash
fdisk /dev/sdb    # 分区
mkfs.ext4 /dev/sdb1  # 格式化
mount /dev/sdb1 /mnt/data  # 挂载
```

### 5.2 系统信息

> "获取模拟器 emu_xxx 的系统信息"

返回 CPU 型号、内存使用、磁盘空间、OS 版本、内核版本、主机名、运行时间。

### 5.3 进程列表

> "获取模拟器 emu_xxx 的进程列表"

返回虚拟机内前 30 个进程的 PID、名称、用户、CPU/内存占用。

### 5.4 软件包安装

> "在模拟器 emu_xxx 中安装 nginx"

Alpine Linux 默认使用 `apk`，也可以指定 `apt`。

### 5.5 QEMU 日志

> "获取模拟器 emu_xxx 的 QEMU 日志，最后 200 行"

QEMU 的 stdout/stderr 被重定向到日志文件，用于排查启动失败等问题。

### 5.6 调试命令行

> "获取模拟器 emu_xxx 的 QEMU 启动命令"

返回完整的 QEMU 命令行参数，用于手动调试。

---

## 6. 故障排查

### 6.1 启动失败

**症状**：`start_vm` 返回 "QEMU 启动失败，进程已退出"

**排查**：
1. 调用 `get_qemu_logs` 查看日志
2. 检查 QEMU 二进制路径是否正确
3. 检查内核/根文件系统路径是否存在
4. 检查是否有权限执行 QEMU 二进制

**常见原因**：
- `qemu-system-aarch64` 不在 PATH 中 → 需要确保 QEMU 二进制在可执行路径
- 内核/根文件系统路径错误 → 检查文件是否存在
- 内存不足 → 降低 `memory` 参数
- QEMU 二进制架构不匹配 → 确保使用 ARM64 版本

### 6.2 QMP 未就绪

**症状**：`start_vm` 返回 "QMP 监控接口未就绪"

**排查**：
1. 调用 `get_qemu_logs` 查看 QEMU 是否报告错误
2. 检查 Socket 目录是否有写权限
3. 调用 `get_qemu_command` 检查命令行参数

### 6.3 命令执行失败

**症状**：`execute_command` 返回 "串口连接失败"

**可能原因**：
- 虚拟机未完全启动 → 等待几秒后重试
- 串口控制台未配置 → 确保内核参数包含 `console=ttyAMA0`
- 根文件系统未配置串口 getty → 检查 `/etc/inittab`

### 6.4 共享文件夹挂载失败

在虚拟机内执行：
```bash
modprobe 9pnet_virtio
mkdir -p /mnt/host
mount -t 9p -o trans=virtio,version=9p2000.L hostshare /mnt/host
```

### 6.5 VNC 黑屏

- 确保根文件系统安装了图形界面（如 X11/Wayland）
- 检查 VNC 端口是否被占用
- 尝试局域网模式连接

### 6.6 插件重载后丢失进程

由于 Java Process 句柄不持久化，插件重载后无法控制已运行的 QEMU 进程。

**解决**：
1. 重启 Operit AI（进程会随应用退出而被终止）
2. 或在应用设置中清理后台进程

---

## 附录：21 个工具函数一览

| 工具 | 说明 | 是否需要 VM 运行 |
|------|------|-----------------|
| create_emulator | 创建模拟器配置 | 否 |
| list_emulators | 列出所有模拟器 | 否 |
| delete_emulator | 删除模拟器 | 否 |
| start_vm | 启动 QEMU 虚拟机 | 否 |
| stop_vm | 停止虚拟机 | 是 |
| get_vm_status | 获取运行状态 | 否 |
| configure_port_mapping | 配置端口转发 | 否 |
| list_port_mappings | 列出端口转发 | 否 |
| remove_port_mapping | 删除端口转发 | 否 |
| execute_command | 在 VM 中执行命令 | 是 |
| get_system_info | 获取系统信息 | 是 |
| get_process_list | 获取进程列表 | 是 |
| upload_file | 上传文件 | 否 |
| download_file | 下载文件 | 否 |
| install_package | 安装软件包 | 是 |
| configure_vnc | 配置 VNC | 否 |
| get_vnc_info | 获取 VNC 信息 | 否 |
| add_disk_drive | 添加磁盘 | 否 |
| configure_shared_folder | 配置共享文件夹 | 否 |
| get_qemu_logs | 获取 QEMU 日志 | 否 |
| get_qemu_command | 获取 QEMU 命令行 | 否 |
