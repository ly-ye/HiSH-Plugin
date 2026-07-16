/* METADATA
{
  "name": "hish_linux_vm",
  "display_name": {
    "zh": "HiSH Linux 虚拟机管理器",
    "en": "HiSH Linux VM Manager",
    "default": "HiSH Linux VM Manager"
  },
  "description": {
    "zh": "基于 HiSH 开源项目架构的 Linux 虚拟机管理插件。通过 Java Bridge 直接启动 QEMU 进程，不依赖系统终端。支持端口转发、virtio-9p 文件共享、VNC 远程桌面、QMP 监控。适用于 Android 和鸿蒙等无系统 Shell 的环境。",
    "en": "Linux VM management plugin based on HiSH architecture. Launches QEMU directly via Java Bridge without system terminal dependency. Supports port forwarding, virtio-9p file sharing, VNC remote desktop, QMP monitoring. Works on Android and HarmonyOS environments without system shell.",
    "default": "HiSH Linux VM Manager - No system terminal required"
  },
  "author": ["HiSH Team"],
  "category": "System",
  "env": ["HISH_VM_DATA_DIR"],
  "tools": [
    {
      "name": "create_emulator",
      "description": { "zh": "创建新的 QEMU 模拟器配置", "en": "Create a new QEMU emulator configuration", "default": "Create emulator config" },
      "parameters": [
        { "name": "name", "description": { "zh": "模拟器名称", "en": "Emulator name", "default": "Name" }, "type": "string", "required": true },
        { "name": "cpu", "description": { "zh": "CPU 核心数（默认 1）", "en": "CPU cores (default 1)", "default": "CPU cores" }, "type": "number", "required": false },
        { "name": "memory", "description": { "zh": "内存大小 MB（默认 512）", "en": "Memory MB (default 512)", "default": "Memory MB" }, "type": "number", "required": false },
        { "name": "rootfs_path", "description": { "zh": "根文件系统镜像路径（qcow2）或 ISO 安装镜像路径", "en": "Rootfs path (qcow2) or ISO image path", "default": "Image path" }, "type": "string", "required": true },
        { "name": "image_type", "description": { "zh": "镜像类型：qcow2（硬盘）或 iso（光盘），默认 qcow2", "en": "Image type: qcow2 or iso, default qcow2", "default": "Image type" }, "type": "string", "required": false },
        { "name": "kernel_path", "description": { "zh": "内核镜像路径", "en": "Kernel image path", "default": "Kernel path" }, "type": "string", "required": true }
      ]
    },
    {
      "name": "list_emulators",
      "description": { "zh": "列出所有已配置的模拟器", "en": "List all configured emulators", "default": "List emulators" },
      "parameters": []
    },
    {
      "name": "delete_emulator",
      "description": { "zh": "删除指定模拟器配置", "en": "Delete an emulator configuration", "default": "Delete emulator" },
      "parameters": [
        { "name": "emulator_id", "description": { "zh": "模拟器 ID", "en": "Emulator ID", "default": "Emulator ID" }, "type": "string", "required": true }
      ]
    },
    {
      "name": "start_vm",
      "description": { "zh": "启动指定模拟器的 QEMU 虚拟机（通过 Java Bridge 直接启动进程，不依赖系统终端）", "en": "Start QEMU VM via Java Bridge (no system terminal required)", "default": "Start VM" },
      "parameters": [
        { "name": "emulator_id", "description": { "zh": "模拟器 ID", "en": "Emulator ID", "default": "Emulator ID" }, "type": "string", "required": true }
      ]
    },
    {
      "name": "stop_vm",
      "description": { "zh": "停止运行中的虚拟机（通过 QMP 优雅关闭或 Process.destroy 强制终止）", "en": "Stop running VM (QMP graceful shutdown or Process.destroy)", "default": "Stop VM" },
      "parameters": [
        { "name": "emulator_id", "description": { "zh": "模拟器 ID", "en": "Emulator ID", "default": "Emulator ID" }, "type": "string", "required": true }
      ]
    },
    {
      "name": "get_vm_status",
      "description": { "zh": "获取虚拟机运行状态（通过 Process.isAlive 检测）", "en": "Get VM running status (via Process.isAlive)", "default": "Get VM status" },
      "parameters": [
        { "name": "emulator_id", "description": { "zh": "模拟器 ID", "en": "Emulator ID", "default": "Emulator ID" }, "type": "string", "required": true }
      ]
    },
    {
      "name": "configure_port_mapping",
      "description": { "zh": "配置端口转发规则", "en": "Configure port forwarding rule", "default": "Configure port mapping" },
      "parameters": [
        { "name": "emulator_id", "description": { "zh": "模拟器 ID", "en": "Emulator ID", "default": "Emulator ID" }, "type": "string", "required": true },
        { "name": "host_port", "description": { "zh": "主机端口", "en": "Host port", "default": "Host port" }, "type": "number", "required": true },
        { "name": "guest_port", "description": { "zh": "客户机端口", "en": "Guest port", "default": "Guest port" }, "type": "number", "required": true }
      ]
    },
    {
      "name": "list_port_mappings",
      "description": { "zh": "列出端口转发规则", "en": "List port forwarding rules", "default": "List port mappings" },
      "parameters": [
        { "name": "emulator_id", "description": { "zh": "模拟器 ID", "en": "Emulator ID", "default": "Emulator ID" }, "type": "string", "required": true }
      ]
    },
    {
      "name": "remove_port_mapping",
      "description": { "zh": "删除端口转发规则", "en": "Remove port forwarding rule", "default": "Remove port mapping" },
      "parameters": [
        { "name": "emulator_id", "description": { "zh": "模拟器 ID", "en": "Emulator ID", "default": "Emulator ID" }, "type": "string", "required": true },
        { "name": "host_port", "description": { "zh": "主机端口", "en": "Host port", "default": "Host port" }, "type": "number", "required": true }
      ]
    },
    {
      "name": "execute_command",
      "description": { "zh": "在虚拟机中执行命令（通过 LocalSocket 连接 QEMU 串口控制台）", "en": "Execute command in VM (via LocalSocket to QEMU serial console)", "default": "Execute command" },
      "parameters": [
        { "name": "emulator_id", "description": { "zh": "模拟器 ID", "en": "Emulator ID", "default": "Emulator ID" }, "type": "string", "required": true },
        { "name": "command", "description": { "zh": "要执行的命令", "en": "Command to execute", "default": "Command" }, "type": "string", "required": true },
        { "name": "timeout_ms", "description": { "zh": "超时时间（毫秒，默认 30000）", "en": "Timeout in ms (default 30000)", "default": "Timeout" }, "type": "number", "required": false }
      ]
    },
    {
      "name": "get_system_info",
      "description": { "zh": "获取虚拟机系统信息（CPU/内存/磁盘）", "en": "Get VM system info (CPU/Memory/Disk)", "default": "Get system info" },
      "parameters": [
        { "name": "emulator_id", "description": { "zh": "模拟器 ID", "en": "Emulator ID", "default": "Emulator ID" }, "type": "string", "required": true }
      ]
    },
    {
      "name": "get_process_list",
      "description": { "zh": "获取虚拟机进程列表", "en": "Get VM process list", "default": "Get processes" },
      "parameters": [
        { "name": "emulator_id", "description": { "zh": "模拟器 ID", "en": "Emulator ID", "default": "Emulator ID" }, "type": "string", "required": true }
      ]
    },
    {
      "name": "upload_file",
      "description": { "zh": "上传文件到虚拟机共享目录", "en": "Upload file to VM shared folder", "default": "Upload file" },
      "parameters": [
        { "name": "emulator_id", "description": { "zh": "模拟器 ID", "en": "Emulator ID", "default": "Emulator ID" }, "type": "string", "required": true },
        { "name": "local_path", "description": { "zh": "本地文件路径", "en": "Local file path", "default": "Local path" }, "type": "string", "required": true },
        { "name": "remote_path", "description": { "zh": "虚拟机目标路径", "en": "Remote path", "default": "Remote path" }, "type": "string", "required": true }
      ]
    },
    {
      "name": "download_file",
      "description": { "zh": "从虚拟机下载文件", "en": "Download file from VM", "default": "Download file" },
      "parameters": [
        { "name": "emulator_id", "description": { "zh": "模拟器 ID", "en": "Emulator ID", "default": "Emulator ID" }, "type": "string", "required": true },
        { "name": "remote_path", "description": { "zh": "虚拟机文件路径", "en": "Remote path", "default": "Remote path" }, "type": "string", "required": true },
        { "name": "local_path", "description": { "zh": "本地目标路径", "en": "Local path", "default": "Local path" }, "type": "string", "required": true }
      ]
    },
    {
      "name": "install_package",
      "description": { "zh": "在虚拟机中安装软件包", "en": "Install package in VM", "default": "Install package" },
      "parameters": [
        { "name": "emulator_id", "description": { "zh": "模拟器 ID", "en": "Emulator ID", "default": "Emulator ID" }, "type": "string", "required": true },
        { "name": "package_name", "description": { "zh": "软件包名称", "en": "Package name", "default": "Package name" }, "type": "string", "required": true },
        { "name": "package_manager", "description": { "zh": "包管理器（apk/apt）", "en": "Package manager (apk/apt)", "default": "Package manager" }, "type": "string", "required": false }
      ]
    },
    {
      "name": "configure_vnc",
      "description": { "zh": "配置 VNC 远程桌面", "en": "Configure VNC remote desktop", "default": "Configure VNC" },
      "parameters": [
        { "name": "emulator_id", "description": { "zh": "模拟器 ID", "en": "Emulator ID", "default": "Emulator ID" }, "type": "string", "required": true },
        { "name": "enabled", "description": { "zh": "是否启用 VNC", "en": "Enable VNC", "default": "Enable VNC" }, "type": "boolean", "required": true },
        { "name": "port_mode", "description": { "zh": "端口模式：local(仅本地) 或 lan(局域网)", "en": "Port mode: local or lan", "default": "Port mode" }, "type": "string", "required": false },
        { "name": "port", "description": { "zh": "VNC 端口号（默认 5900）", "en": "VNC port (default 5900)", "default": "VNC port" }, "type": "number", "required": false }
      ]
    },
    {
      "name": "get_vnc_info",
      "description": { "zh": "获取 VNC 连接信息", "en": "Get VNC connection info", "default": "Get VNC info" },
      "parameters": [
        { "name": "emulator_id", "description": { "zh": "模拟器 ID", "en": "Emulator ID", "default": "Emulator ID" }, "type": "string", "required": true }
      ]
    },
    {
      "name": "add_disk_drive",
      "description": { "zh": "添加额外磁盘驱动器", "en": "Add extra disk drive", "default": "Add disk drive" },
      "parameters": [
        { "name": "emulator_id", "description": { "zh": "模拟器 ID", "en": "Emulator ID", "default": "Emulator ID" }, "type": "string", "required": true },
        { "name": "image_path", "description": { "zh": "磁盘镜像路径", "en": "Disk image path", "default": "Image path" }, "type": "string", "required": true },
        { "name": "format", "description": { "zh": "镜像格式（qcow2/raw，默认 qcow2）", "en": "Image format (qcow2/raw)", "default": "Format" }, "type": "string", "required": false }
      ]
    },
    {
      "name": "configure_shared_folder",
      "description": { "zh": "配置共享文件夹（virtio-9p）", "en": "Configure shared folder (virtio-9p)", "default": "Configure shared folder" },
      "parameters": [
        { "name": "emulator_id", "description": { "zh": "模拟器 ID", "en": "Emulator ID", "default": "Emulator ID" }, "type": "string", "required": true },
        { "name": "host_path", "description": { "zh": "主机共享目录路径", "en": "Host shared folder path", "default": "Host path" }, "type": "string", "required": false },
        { "name": "readonly", "description": { "zh": "是否只读", "en": "Read only", "default": "Read only" }, "type": "boolean", "required": false }
      ]
    },
    {
      "name": "get_qemu_logs",
      "description": { "zh": "获取 QEMU 运行日志", "en": "Get QEMU runtime logs", "default": "Get QEMU logs" },
      "parameters": [
        { "name": "emulator_id", "description": { "zh": "模拟器 ID", "en": "Emulator ID", "default": "Emulator ID" }, "type": "string", "required": true },
        { "name": "lines", "description": { "zh": "返回最后多少行（默认 100）", "en": "Last N lines (default 100)", "default": "Lines" }, "type": "number", "required": false }
      ]
    },
    {
      "name": "get_qemu_command",
      "description": { "zh": "获取 QEMU 启动命令行（用于调试）", "en": "Get QEMU launch command line (for debugging)", "default": "Get QEMU command" },
      "parameters": [
        { "name": "emulator_id", "description": { "zh": "模拟器 ID", "en": "Emulator ID", "default": "Emulator ID" }, "type": "string", "required": true }
      ]
    }
  ]
}*/

// ============================================================================
// HiSH Plugin Core - Java Bridge Edition
// 不依赖系统终端，通过 Java Bridge 直接管理 QEMU 进程
// 基于 HiSH entry/src/main/ets/lib/startVm.ets 架构
// ============================================================================

var HiSHPlugin = (function () {
    var CONFIG_DIR = NativeInterface.getPluginConfigDir('hish_linux_vm');
    var EMULATORS_FILE = CONFIG_DIR + '/emulators.json';
    var emulators = {};

    // ========================================================================
    // Java Bridge - 核心引擎
    // 通过 Java.type() 直接调用 Java API，完全绕过系统 Shell
    // ========================================================================

    var JavaBridge = {
        // Java 类引用（延迟加载）
        _classes: {},

        cls: function (name) {
            if (!this._classes[name]) {
                this._classes[name] = Java.type(name);
            }
            return this._classes[name];
        },

        // 通过 ProcessBuilder 启动进程，输出重定向到文件
        launchProcess: function (cmdArray, logFilePath) {
            var ProcessBuilder = this.cls('java.lang.ProcessBuilder');
            var File = this.cls('java.io.File');

            // 用 ArrayList 构建命令列表（确保构造函数匹配）
            var ArrayList = this.cls('java.util.ArrayList');
            var cmdList = new ArrayList();
            for (var i = 0; i < cmdArray.length; i++) {
                cmdList.add(cmdArray[i]);
            }

            // 创建 ProcessBuilder(List<String> command)
            var pb = new ProcessBuilder(cmdList);

            // 合并 stderr 到 stdout
            pb.redirectErrorStream(true);

            // 重定向输出到日志文件
            var logFile = new File(logFilePath);
            try {
                var Redirect = this.cls('java.lang.ProcessBuilder$Redirect');
                pb.redirectOutput(Redirect.to(logFile));
            } catch (e) {
                // 如果 Redirect.to 不可用，使用 redirectOutput(File)
                try {
                    pb.redirectOutput(logFile);
                } catch (e2) {
                    // 忽略 - 输出将被丢弃
                }
            }

            // 启动进程
            var process = pb.start();
            return process;
        },

        // 检查进程是否存活
        isAlive: function (process) {
            if (!process) return false;
            try {
                return process.isAlive();
            } catch (e) {
                try {
                    // Java 7 兼容：通过 exitValue 抛异常来判断
                    process.exitValue();
                    return false; // 已退出
                } catch (e2) {
                    return true; // 仍在运行
                }
            }
        },

        // 优雅终止进程
        destroy: function (process) {
            if (!process) return;
            try {
                process.destroy();
            } catch (e) {}
        },

        // 强制终止进程
        destroyForcibly: function (process) {
            if (!process) return;
            try {
                process.destroyForcibly();
            } catch (e) {
                try {
                    process.destroy();
                } catch (e2) {}
            }
        },

        // 检查 Unix Socket 文件是否存在（通过 Java File）
        fileExists: function (path) {
            try {
                var File = this.cls('java.io.File');
                var f = new File(path);
                return f.exists();
            } catch (e) {
                return false;
            }
        },

        // 删除文件（通过 Java File）
        deleteFile: function (path) {
            try {
                var File = this.cls('java.io.File');
                var f = new File(path);
                return f.delete();
            } catch (e) {
                return false;
            }
        },

        // 连接 Unix Domain Socket（QEMU serial / QMP）
        connectUnixSocket: function (socketPath, timeoutMs) {
            var LocalSocket = this.cls('android.net.LocalSocket');
            var LocalSocketAddress = this.cls('android.net.LocalSocketAddress');

            var socket = new LocalSocket();
            var addr = new LocalSocketAddress(socketPath, 0); // 0 = NAMESPACE_FILESYSTEM

            socket.connect(addr);

            if (timeoutMs && timeoutMs > 0) {
                socket.setSoTimeout(timeoutMs);
            }

            return socket;
        },

        // 通过 LocalSocket 发送数据并读取响应
        socketSendAndRead: function (socket, writeLines, readTimeoutMs, maxReadMs) {
            var InputStreamReader = this.cls('java.io.InputStreamReader');
            var BufferedReader = this.cls('java.io.BufferedReader');
            var OutputStreamWriter = this.cls('java.io.OutputStreamWriter');
            var BufferedWriter = this.cls('java.io.BufferedWriter');

            var inputStream = socket.getInputStream();
            var outputStream = socket.getOutputStream();

            var reader = new BufferedReader(new InputStreamReader(inputStream));
            var writer = new BufferedWriter(new OutputStreamWriter(outputStream));

            // 写入所有命令行
            for (var i = 0; i < writeLines.length; i++) {
                writer.write(writeLines[i] + "\n");
            }
            writer.flush();

            // 读取响应
            var output = "";
            var startTime = Date.now();
            var readTimeoutPerCall = readTimeoutMs || 1000;
            socket.setSoTimeout(readTimeoutPerCall);

            while (Date.now() - startTime < (maxReadMs || 10000)) {
                var line;
                try {
                    line = reader.readLine();
                } catch (e) {
                    // SocketTimeoutException - 暂无数据，继续等待
                    break;
                }
                if (line === null) break; // 流结束
                output += String(line) + "\n";
            }

            return output;
        },

        // 关闭 Socket
        closeSocket: function (socket) {
            if (!socket) return;
            try {
                socket.close();
            } catch (e) {}
        }
    };

    // ========================================================================
    // QMP 协议通信（通过 LocalSocket）
    // ========================================================================

    function qmpSendCommand(socketPath, qmpCommand) {
        try {
            var socket = JavaBridge.connectUnixSocket(socketPath, 3000);
            var InputStreamReader = JavaBridge.cls('java.io.InputStreamReader');
            var BufferedReader = JavaBridge.cls('java.io.BufferedReader');
            var OutputStreamWriter = JavaBridge.cls('java.io.OutputStreamWriter');
            var BufferedWriter = JavaBridge.cls('java.io.BufferedWriter');

            var reader = new BufferedReader(new InputStreamReader(socket.getInputStream()));
            var writer = new BufferedWriter(new OutputStreamWriter(socket.getOutputStream()));

            // 读取 QMP greeting
            var greeting;
            try {
                greeting = reader.readLine();
            } catch (e) {
                JavaBridge.closeSocket(socket);
                return null;
            }

            // 发送 qmp_capabilities 握手
            writer.write('{"execute": "qmp_capabilities"}\n');
            writer.flush();
            try {
                reader.readLine(); // 读取握手响应
            } catch (e) {}

            // 发送实际命令
            writer.write('{"execute": "' + qmpCommand + '"}\n');
            writer.flush();

            var response;
            try {
                response = reader.readLine();
            } catch (e) {
                response = null;
            }

            JavaBridge.closeSocket(socket);
            return response;
        } catch (e) {
            return null;
        }
    }

    // ========================================================================
    // 串口控制台通信（通过 LocalSocket 连接 QEMU serial socket）
    // ========================================================================

    function serialExec(emu, command, timeoutMs) {
        var socket = null;
        try {
            socket = JavaBridge.connectUnixSocket(emu.serialSocket, 1000);

            var InputStreamReader = JavaBridge.cls('java.io.InputStreamReader');
            var BufferedReader = JavaBridge.cls('java.io.BufferedReader');
            var OutputStreamWriter = JavaBridge.cls('java.io.OutputStreamWriter');
            var BufferedWriter = JavaBridge.cls('java.io.BufferedWriter');

            var reader = new BufferedReader(new InputStreamReader(socket.getInputStream()));
            var writer = new BufferedWriter(new OutputStreamWriter(socket.getOutputStream()));

            // 发送命令 + 结束标记
            var marker = "___CMD_END_" + Date.now() + "___";
            writer.write(command + "\n");
            writer.write("echo " + marker + "\n");
            writer.flush();

            // 读取输出直到遇到标记或超时
            var output = "";
            var startTime = Date.now();
            var overallTimeout = timeoutMs || 30000;

            while (Date.now() - startTime < overallTimeout) {
                var line;
                try {
                    line = reader.readLine();
                } catch (e) {
                    // SocketTimeoutException - 等待更多数据
                    break;
                }
                if (line === null) break;
                var lineStr = String(line);
                if (lineStr.indexOf(marker) !== -1) break;
                output += lineStr + "\n";
            }

            JavaBridge.closeSocket(socket);
            socket = null;

            // 去除命令回显（串口控制台会回显输入的命令）
            var lines = output.split('\n');
            var filtered = [];
            for (var i = 0; i < lines.length; i++) {
                var trimmed = lines[i].trim();
                // 跳过空行、命令回显、提示符行
                if (trimmed === command.trim()) continue;
                if (trimmed === "$" || trimmed === "#" || trimmed === ">") continue;
                if (trimmed.length === 0) continue;
                filtered.push(lines[i]);
            }

            return {
                exitCode: 0,
                output: filtered.join('\n').trim(),
                timedOut: false
            };
        } catch (e) {
            if (socket) JavaBridge.closeSocket(socket);
            var errMsg = (e && e.message) ? e.message : String(e);
            return {
                exitCode: -1,
                output: '串口连接失败: ' + errMsg,
                timedOut: false
            };
        }
    }

    // ========================================================================
    // QEMU 命令行构建 - 基于 HiSH startVm.ets
    // ========================================================================

    function buildQemuCommand(emu) {
        var baseDir = getEmulatorDir(emu.id);
        var sharedFolderOption = emu.sharedFolderReadonly ? ",readonly" : "";
        var root = emu.rootVda || '/dev/sda';

        var args = [];

        // 基本机器配置
        args.push('-machine', 'virt,acpi=on,gic-version=max,' +
            'iommu=none,its=off,usb=off,virtualization=off,memory-backend=mem0,compact-highmem=on,' +
            'dump-guest-core=off,mem-merge=off,hmat=off');
        args.push('-overcommit', 'cpu-pm=off');
        args.push('-cpu', 'max,pauth-impdef=on,sve=off,pmu=off');
        args.push('-accel', 'tcg,thread=multi,tb-size=2048');
        args.push('-object', 'rng-random,filename=/dev/urandom,id=rng0');
        args.push('-device', 'virtio-rng-pci-non-transitional,rng=rng0');
        args.push('-rtc', 'base=utc,clock=host');
        args.push('-L', baseDir);

        // 串口（Unix Socket）
        args.push('-serial', 'unix:' + emu.serialSocket + ',server,nowait');

        // CPU 和内存
        args.push('-smp', 'cpus=' + emu.cpu + ',sockets=1,cores=' + emu.cpu + ',threads=1');
        args.push('-object', 'memory-backend-ram,id=mem0,size=' + emu.memory + 'M,merge=off,prealloc=off');
        args.push('-m', emu.memory + 'M');

        // 内核
        args.push('-kernel', emu.kernelPath);

        // 网络（用户模式 + 端口转发）
        args.push('-global', 'virtio-net-pci.ctrl_guest_offloads=off');
        args.push('-global', 'virtio-net-pci.packed=on');
        args.push('-device', 'virtio-net-pci-non-transitional,' +
            'netdev=eth0,csum=on,gso=on,guest_tso4=on,guest_tso6=on,guest_ecn=off,mrg_rxbuf=on,tx=bh');
        var netdev = 'user,id=eth0';
        for (var i = 0; i < emu.portMapping.length; i++) {
            var pm = emu.portMapping[i];
            netdev += ',hostfwd=tcp::' + pm.host + '-:' + pm.guest;
        }
        args.push('-netdev', netdev);

        // 共享文件夹（virtio-9p）
        args.push('-fsdev', 'local,security_model=mapped-file,id=fsdev0,path=' + emu.sharedFolder + sharedFolderOption);
        args.push('-device', 'virtio-9p-pci,id=fs0,fsdev=fsdev0,mount_tag=hostshare');

        if (emu.imageType === 'iso') {
            args.push('-cdrom', emu.rootFilesystem);
        } else {
            args.push('-global', 'virtio-blk-pci.scsi=off');
            args.push('-global', 'virtio-scsi-pci.cmd_per_lun=128');
            args.push('-global', 'virtio-scsi-pci.packed=on');
            args.push('-drive', 'if=none,format=qcow2,file=' + emu.rootFilesystem +
                ',id=hd0,cache=writeback,aio=threads,discard=unmap');
            args.push('-object', 'iothread,id=iothread0,poll-max-ns=2000000');
            args.push('-device', 'virtio-scsi-pci-non-transitional,id=scsi0,num_queues=' + emu.cpu +
                ',virtqueue_size=256,iothread=iothread0');
            args.push('-device', 'scsi-hd,drive=hd0,bus=scsi0.0,logical_block_size=4096,' +
                'physical_block_size=4096,rotation_rate=1,bootindex=1');

            if (emu.disks) {
                for (var d = 0; d < emu.disks.length; d++) {
                    var disk = emu.disks[d];
                    var fmt = disk.format || 'qcow2';
                    args.push('-drive', 'if=none,format=' + fmt + ',file=' + disk.path +
                        ',id=' + disk.id + ',cache=writeback,aio=threads');
                    args.push('-device', 'scsi-hd,drive=' + disk.id + ',bus=scsi0.0');
                }
            }
        }

        var appendArgs;
        if (emu.imageType === 'iso') {
            appendArgs = 'root=/dev/ram0 rw ramdisk_size=512000 console=tty0 console=ttyAMA0 consoleblank=0 ' +
                'elevator=noop acpi=on mitigations=off audit=0 nmi_watchdog=0 ' +
                'security=none selinux=0 apparmor=0 psi=0 random.trust_cpu=on ' +
                'TERM=xterm';
        } else {
            appendArgs = 'root=' + root + ' rw rootfstype=ext4 rootwait console=tty0 console=ttyAMA0 consoleblank=0 ' +
                'elevator=noop skew_tick=1 acpi=on ' +
                'mitigations=off audit=0 nmi_watchdog=0 hardened_usercopy=off random.trust_cpu=on virtio_balloon.config_impl=0 ' +
                'security=none selinux=0 apparmor=0 psi=0 page_alloc.shuffle=0 swiotlb=noforce idle=halt ' +
                'cpuidle.off=1 transparent_hugepage=always pci=noaer scsi_mod.use_blk_mq=1 rng_core.default_quality=1000 ' +
                'systemd.mask=run-lock.mount systemd.mask=sys-kernel-debug.mount systemd.mask=dev-hugepages.mount ' +
                'cryptomgr.notests rodata=off rcupdate.rcu_cpu_stall_timeout=60 ' +
                'rcu_expedited=1 init_on_free=0 init_on_alloc=1 page_poison=0 slub_debug=- ' +
                'TERM=xterm init=' + emu.init;
        }
        args.push('-append', appendArgs);

        // QMP 监控
        args.push('-qmp', 'unix:' + emu.qmpSocket + ',server,nowait');

        // QEMU Guest Agent
        args.push('-device', 'virtio-serial-pci-non-transitional,id=virtio-serial0');
        args.push('-chardev', 'socket,path=' + emu.qgaSocket + ',server=on,wait=off,id=qga0');
        args.push('-device', 'virtserialport,chardev=qga0,bus=virtio-serial0.0,name=org.qemu.guest_agent.0');

        // VNC
        if (emu.vncEnabled) {
            var vncHost = emu.vncPortMode === 'lan' ? '0.0.0.0' : '127.0.0.1';
            args.push('-vnc', vncHost + ':' + (emu.vncPort - 5900));
            args.push('-device', 'virtio-gpu-pci');
            args.push('-device', 'virtio-keyboard-pci');
            args.push('-device', 'virtio-tablet-pci');
        }

        return args;
    }

    // ========================================================================
    // 辅助函数
    // ========================================================================

    function generateId() {
        return 'emu_' + Date.now() + '_' + Math.floor(Math.random() * 10000);
    }

    function getEmulatorDir(emulatorId) {
        return CONFIG_DIR + '/' + emulatorId;
    }

    async function cleanupSockets(emu) {
        var sockets = [emu.serialSocket, emu.qmpSocket, emu.qgaSocket];
        for (var i = 0; i < sockets.length; i++) {
            try {
                var stat = await Tools.Files.exists(sockets[i]);
                if (stat.exists) {
                    await Tools.Files.deleteFile(sockets[i]);
                }
            } catch (e) {
                // 同时尝试 Java File 删除
                JavaBridge.deleteFile(sockets[i]);
            }
        }
    }

    // ========================================================================
    // 模拟器配置持久化
    // ========================================================================

    async function loadEmulators() {
        var fileStat = await Tools.Files.exists(EMULATORS_FILE);
        if (fileStat.exists) {
            var data = await Tools.Files.read(EMULATORS_FILE);
            var list = dataUtils.parseJson(data.content);
            emulators = {};
            for (var i = 0; i < list.length; i++) {
                var emu = list[i];
                emu.status = 'stopped';
                emu.processHandle = null; // 进程句柄不持久化
                emulators[emu.id] = emu;
            }
        }
    }

    async function saveEmulators() {
        var list = [];
        for (var key in emulators) {
            if (emulators.hasOwnProperty(key)) {
                var emu = emulators[key];
                // 不保存运行时字段
                var saved = {
                    id: emu.id,
                    name: emu.name,
                    cpu: emu.cpu,
                    memory: emu.memory,
                    init: emu.init,
                    portMapping: emu.portMapping,
                    rootVda: emu.rootVda,
                    rootFilesystem: emu.rootFilesystem,
                    kernelPath: emu.kernelPath,
                    sharedFolderReadonly: emu.sharedFolderReadonly,
                    sharedFolder: emu.sharedFolder,
                    serialSocket: emu.serialSocket,
                    qmpSocket: emu.qmpSocket,
                    qgaSocket: emu.qgaSocket,
                    vncEnabled: emu.vncEnabled,
                    vncPortMode: emu.vncPortMode,
                    vncPort: emu.vncPort,
                    disks: emu.disks
                };
                list.push(saved);
            }
        }
        await Tools.Files.write(EMULATORS_FILE, dataUtils.stringifyJson(list));
    }

    // ========================================================================
    // 工具实现
    // ========================================================================

    async function create_emulator(params) {
        await loadEmulators();

        var id = generateId();
        var baseDir = getEmulatorDir(id);

        var imageType = params.image_type || 'qcow2';
        var emulator = {
            id: id,
            name: params.name,
            cpu: params.cpu || 1,
            memory: params.memory || 512,
            init: '/sbin/init',
            portMapping: [],
            rootVda: imageType === 'iso' ? '/dev/ram0' : '/dev/sda',
            rootFilesystem: params.rootfs_path,
            imageType: imageType,
            kernelPath: params.kernel_path,
            sharedFolderReadonly: false,
            sharedFolder: baseDir + '/shared',
            serialSocket: baseDir + '/serial.sock',
            qmpSocket: baseDir + '/qmp.sock',
            qgaSocket: baseDir + '/qga.sock',
            vncEnabled: false,
            vncPortMode: 'local',
            vncPort: 5900,
            disks: [],
            status: 'stopped',
            processHandle: null
        };

        emulators[id] = emulator;
        await saveEmulators();

        await Tools.Files.mkdir(baseDir);
        await Tools.Files.mkdir(emulator.sharedFolder);

        return {
            success: true,
            message: '模拟器 "' + params.name + '" 创建成功 (ID: ' + id + ')',
            data: { emulatorId: id }
        };
    }

    async function list_emulators() {
        await loadEmulators();
        var list = [];
        for (var key in emulators) {
            if (emulators.hasOwnProperty(key)) {
                var emu = emulators[key];
                list.push({
                    id: emu.id,
                    name: emu.name,
                    cpu: emu.cpu,
                    memory: emu.memory,
                    status: emu.status,
                    rootFilesystem: emu.rootFilesystem
                });
            }
        }
        return { success: true, data: list };
    }

    async function delete_emulator(params) {
        await loadEmulators();
        var emu = emulators[params.emulator_id];
        if (!emu) {
            return { success: false, message: '模拟器 ' + params.emulator_id + ' 不存在' };
        }
        if (emu.status === 'running') {
            return { success: false, message: '请先停止虚拟机后再删除' };
        }
        delete emulators[params.emulator_id];
        await saveEmulators();
        return { success: true, message: '模拟器 ' + emu.name + ' 已删除' };
    }

    async function start_vm(params) {
        await loadEmulators();
        var emu = emulators[params.emulator_id];
        if (!emu) {
            return { success: false, message: '模拟器 ' + params.emulator_id + ' 不存在' };
        }
        if (emu.status === 'running') {
            return { success: false, message: '虚拟机已在运行中' };
        }

        emu.status = 'starting';
        await saveEmulators();

        var qemuArgs = buildQemuCommand(emu);
        var logFile = getEmulatorDir(emu.id) + '/qemu.log';

        try {
            // 清理旧 Socket 文件
            await cleanupSockets(emu);

            // 通过 Java Bridge ProcessBuilder 启动 QEMU（不依赖系统终端）
            var process = JavaBridge.launchProcess(qemuArgs, logFile);
            emu.processHandle = process;

            // 等待 QEMU 初始化
            await Tools.System.sleep(4000);

            // 检查进程是否存活
            if (!JavaBridge.isAlive(process)) {
                emu.status = 'error';
                emu.processHandle = null;
                await saveEmulators();
                return { success: false, message: 'QEMU 启动失败，进程已退出。请调用 get_qemu_logs 查看日志' };
            }

            // 检查 QMP Socket 是否就绪
            var qmpReady = false;
            for (var i = 0; i < 5; i++) {
                await Tools.System.sleep(1000);
                if (JavaBridge.fileExists(emu.qmpSocket)) {
                    qmpReady = true;
                    break;
                }
            }

            emu.status = qmpReady ? 'running' : 'error';
            emu.uptime = Date.now();
            await saveEmulators();

            if (!qmpReady) {
                return {
                    success: false,
                    message: 'QEMU 进程已启动但 QMP 监控接口未就绪。请调用 get_qemu_logs 查看日志'
                };
            }

            return {
                success: true,
                message: '虚拟机 ' + emu.name + ' 启动成功',
                data: {
                    emulatorId: emu.id,
                    status: 'running',
                    message: '运行中',
                    uptime: emu.uptime
                }
            };
        } catch (error) {
            emu.status = 'error';
            emu.processHandle = null;
            await saveEmulators();
            var msg = (error && error.message) ? error.message : String(error);
            return { success: false, message: '启动失败: ' + msg };
        }
    }

    async function stop_vm(params) {
        await loadEmulators();
        var emu = emulators[params.emulator_id];
        if (!emu) {
            return { success: false, message: '模拟器 ' + params.emulator_id + ' 不存在' };
        }
        if (emu.status !== 'running') {
            return { success: false, message: '虚拟机未在运行' };
        }

        // 1. 尝试 QMP 优雅关闭
        var qmpResp = qmpSendCommand(emu.qmpSocket, 'quit');

        if (qmpResp !== null) {
            // QMP 响应成功，等待进程退出
            await Tools.System.sleep(2000);
        }

        // 2. 检查进程是否仍存活，如果是则强制终止
        if (emu.processHandle && JavaBridge.isAlive(emu.processHandle)) {
            JavaBridge.destroy(emu.processHandle);
            await Tools.System.sleep(1000);

            if (JavaBridge.isAlive(emu.processHandle)) {
                JavaBridge.destroyForcibly(emu.processHandle);
            }
        }

        emu.status = 'stopped';
        emu.processHandle = null;
        emu.uptime = undefined;
        await saveEmulators();

        return {
            success: true,
            message: '虚拟机 ' + emu.name + ' 已停止',
            data: {
                emulatorId: emu.id,
                status: 'stopped',
                message: '已停止'
            }
        };
    }

    async function get_vm_status(params) {
        await loadEmulators();
        var emu = emulators[params.emulator_id];
        if (!emu) {
            return {
                success: false,
                data: {
                    emulatorId: params.emulator_id,
                    status: 'error',
                    message: '模拟器不存在'
                }
            };
        }

        // 通过 Process.isAlive 检测进程状态
        if (emu.status === 'running' && emu.processHandle) {
            if (!JavaBridge.isAlive(emu.processHandle)) {
                emu.status = 'stopped';
                emu.processHandle = null;
                emu.uptime = undefined;
                await saveEmulators();
            }
        }

        var statusMsg = '已停止';
        if (emu.status === 'running') statusMsg = '运行中';
        else if (emu.status === 'starting') statusMsg = '启动中';
        else if (emu.status === 'error') statusMsg = '错误';

        return {
            success: true,
            data: {
                emulatorId: emu.id,
                status: emu.status,
                message: statusMsg,
                uptime: emu.uptime
            }
        };
    }

    async function configure_port_mapping(params) {
        await loadEmulators();
        var emu = emulators[params.emulator_id];
        if (!emu) {
            return { success: false, message: '模拟器 ' + params.emulator_id + ' 不存在' };
        }

        var existing = null;
        for (var i = 0; i < emu.portMapping.length; i++) {
            if (emu.portMapping[i].host === params.host_port) {
                existing = emu.portMapping[i];
                break;
            }
        }

        if (existing) {
            existing.guest = params.guest_port;
        } else {
            emu.portMapping.push({ host: params.host_port, guest: params.guest_port });
        }
        await saveEmulators();

        return {
            success: true,
            message: '端口转发规则已配置: 主机 ' + params.host_port + ' -> 客户机 ' + params.guest_port
        };
    }

    async function list_port_mappings(params) {
        await loadEmulators();
        var emu = emulators[params.emulator_id];
        if (!emu) {
            return { success: false, data: [] };
        }
        return { success: true, data: emu.portMapping };
    }

    async function remove_port_mapping(params) {
        await loadEmulators();
        var emu = emulators[params.emulator_id];
        if (!emu) {
            return { success: false, message: '模拟器 ' + params.emulator_id + ' 不存在' };
        }

        var idx = -1;
        for (var i = 0; i < emu.portMapping.length; i++) {
            if (emu.portMapping[i].host === params.host_port) {
                idx = i;
                break;
            }
        }

        if (idx === -1) {
            return { success: false, message: '未找到主机端口 ' + params.host_port + ' 的转发规则' };
        }

        emu.portMapping.splice(idx, 1);
        await saveEmulators();
        return { success: true, message: '端口转发规则 ' + params.host_port + ' 已删除' };
    }

    async function execute_command(params) {
        await loadEmulators();
        var emu = emulators[params.emulator_id];
        if (!emu) {
            return { success: false, data: { exitCode: -1, output: '模拟器不存在' } };
        }
        if (emu.status !== 'running') {
            return { success: false, data: { exitCode: -1, output: '虚拟机未运行' } };
        }

        // 通过 LocalSocket 连接 QEMU 串口控制台执行命令
        var result = serialExec(emu, params.command, params.timeout_ms);
        return { success: result.exitCode === 0, data: result };
    }

    async function get_system_info(params) {
        await loadEmulators();
        var emu = emulators[params.emulator_id];
        if (!emu || emu.status !== 'running') {
            return {
                success: false,
                data: {
                    cpu: { model: '', cores: 0, usage: 0 },
                    memory: { total: 0, used: 0, available: 0 },
                    disk: { total: 0, used: 0, available: 0 },
                    os: '', kernel: '', hostname: '', uptime: ''
                }
            };
        }

        var cpuResult = serialExec(emu, 'cat /proc/cpuinfo | grep "model name" | head -1 | cut -d: -f2 | xargs', 5000);
        var memResult = serialExec(emu, "free -m | awk 'NR==2{print $2,$3,$7}'", 5000);
        var diskResult = serialExec(emu, "df -B1 / | awk 'NR==2{print $2,$3,$4}'", 5000);
        var osResult = serialExec(emu, 'cat /etc/os-release | grep PRETTY_NAME | cut -d= -f2 | tr -d \'"\'', 5000);
        var kernelResult = serialExec(emu, 'uname -r', 5000);
        var hostnameResult = serialExec(emu, 'hostname', 5000);
        var uptimeResult = serialExec(emu, 'uptime -p', 5000);

        var memParts = memResult.output.trim().split(/\s+/);
        var diskParts = diskResult.output.trim().split(/\s+/);

        return {
            success: true,
            data: {
                cpu: {
                    model: cpuResult.output.trim() || 'ARM64',
                    cores: emu.cpu,
                    usage: 0
                },
                memory: {
                    total: parseInt(memParts[0]) || 0,
                    used: parseInt(memParts[1]) || 0,
                    available: parseInt(memParts[2]) || 0
                },
                disk: {
                    total: parseInt(diskParts[0]) || 0,
                    used: parseInt(diskParts[1]) || 0,
                    available: parseInt(diskParts[2]) || 0
                },
                os: osResult.output.trim() || 'Linux',
                kernel: kernelResult.output.trim(),
                hostname: hostnameResult.output.trim(),
                uptime: uptimeResult.output.trim()
            }
        };
    }

    async function get_process_list(params) {
        await loadEmulators();
        var emu = emulators[params.emulator_id];
        if (!emu || emu.status !== 'running') {
            return { success: false, data: [] };
        }

        var result = serialExec(emu, 'ps aux | tail -n +2', 5000);
        var lines = result.output.trim().split('\n').filter(function (l) { return l.trim(); });

        var processes = [];
        for (var i = 0; i < lines.length && i < 30; i++) {
            var parts = lines[i].trim().split(/\s+/);
            processes.push({
                pid: parseInt(parts[1]) || 0,
                name: parts[10] || '',
                user: parts[0] || '',
                cpu: parseFloat(parts[2]) || 0,
                memory: parseFloat(parts[3]) || 0,
                status: parts[7] || ''
            });
        }

        return { success: true, data: processes };
    }

    async function upload_file(params) {
        await loadEmulators();
        var emu = emulators[params.emulator_id];
        if (!emu) {
            return { success: false, message: '模拟器 ' + params.emulator_id + ' 不存在' };
        }

        var content = await Tools.Files.read(params.local_path);
        await Tools.Files.write(params.remote_path, content.content, false, 'linux');

        return {
            success: true,
            message: '文件上传成功: ' + params.local_path + ' -> ' + params.remote_path
        };
    }

    async function download_file(params) {
        await loadEmulators();
        var emu = emulators[params.emulator_id];
        if (!emu) {
            return { success: false, message: '模拟器 ' + params.emulator_id + ' 不存在' };
        }

        var content = await Tools.Files.read(params.remote_path);
        await Tools.Files.write(params.local_path, content.content, false, 'android');

        return {
            success: true,
            message: '文件下载成功: ' + params.remote_path + ' -> ' + params.local_path
        };
    }

    async function install_package(params) {
        await loadEmulators();
        var emu = emulators[params.emulator_id];
        if (!emu || emu.status !== 'running') {
            return { success: false, message: '虚拟机未运行' };
        }

        var pm = params.package_manager || 'apk';
        var command = '';

        if (pm === 'apt') {
            command = 'apt-get update && apt-get install -y ' + params.package_name;
        } else {
            command = 'apk add ' + params.package_name;
        }

        var result = serialExec(emu, command, 120000);

        if (result.exitCode === 0) {
            return { success: true, message: '软件包 ' + params.package_name + ' 安装成功' };
        } else {
            return { success: false, message: '安装失败: ' + result.output };
        }
    }

    async function configure_vnc(params) {
        await loadEmulators();
        var emu = emulators[params.emulator_id];
        if (!emu) {
            return { success: false, message: '模拟器 ' + params.emulator_id + ' 不存在' };
        }
        if (emu.status === 'running') {
            return { success: false, message: '请先停止虚拟机再修改 VNC 配置' };
        }

        emu.vncEnabled = params.enabled;
        if (params.port_mode) {
            emu.vncPortMode = params.port_mode === 'lan' ? 'lan' : 'local';
        }
        if (params.port) {
            emu.vncPort = params.port;
        }
        await saveEmulators();

        var msg = params.enabled
            ? 'VNC 已启用 (' + emu.vncPortMode + ' 模式, 端口 ' + emu.vncPort + ')'
            : 'VNC 已禁用';
        return { success: true, message: msg };
    }

    async function get_vnc_info(params) {
        await loadEmulators();
        var emu = emulators[params.emulator_id];
        if (!emu) {
            return { success: false, data: { enabled: false, host: '', port: 0, display: 0 } };
        }

        return {
            success: true,
            data: {
                enabled: emu.vncEnabled,
                host: emu.vncPortMode === 'lan' ? '0.0.0.0' : '127.0.0.1',
                port: emu.vncPort,
                display: emu.vncPort - 5900
            }
        };
    }

    async function add_disk_drive(params) {
        await loadEmulators();
        var emu = emulators[params.emulator_id];
        if (!emu) {
            return { success: false, message: '模拟器 ' + params.emulator_id + ' 不存在' };
        }
        if (emu.status === 'running') {
            return { success: false, message: '请先停止虚拟机再添加磁盘' };
        }

        var diskId = 'disk_' + Date.now();
        emu.disks.push({
            id: diskId,
            path: params.image_path,
            format: params.format || 'qcow2'
        });
        await saveEmulators();

        return { success: true, message: '磁盘已添加 (ID: ' + diskId + ')' };
    }

    async function configure_shared_folder(params) {
        await loadEmulators();
        var emu = emulators[params.emulator_id];
        if (!emu) {
            return { success: false, message: '模拟器 ' + params.emulator_id + ' 不存在' };
        }
        if (emu.status === 'running') {
            return { success: false, message: '请先停止虚拟机再修改共享文件夹配置' };
        }

        if (params.host_path) {
            emu.sharedFolder = params.host_path;
        }
        if (typeof params.readonly === 'boolean') {
            emu.sharedFolderReadonly = params.readonly;
        }
        await saveEmulators();

        return {
            success: true,
            message: '共享文件夹已配置: ' + emu.sharedFolder + ' (只读: ' + emu.sharedFolderReadonly + ')'
        };
    }

    async function get_qemu_logs(params) {
        await loadEmulators();
        var emu = emulators[params.emulator_id];
        if (!emu) {
            return { success: false, data: { logs: '' } };
        }

        var logFile = getEmulatorDir(emu.id) + '/qemu.log';
        try {
            var stat = await Tools.Files.exists(logFile);
            if (!stat.exists) {
                return { success: true, data: { logs: '暂无日志文件' } };
            }
            var content = await Tools.Files.read(logFile);
            var allLines = content.content.split('\n');
            var lineCount = params.lines || 100;
            var logs = allLines.slice(-lineCount).join('\n');
            return { success: true, data: { logs: logs } };
        } catch (e) {
            var msg = (e && e.message) ? e.message : String(e);
            return { success: false, data: { logs: '读取日志失败: ' + msg } };
        }
    }

    async function get_qemu_command(params) {
        await loadEmulators();
        var emu = emulators[params.emulator_id];
        if (!emu) {
            return { success: false, data: { command: '' } };
        }

        var args = buildQemuCommand(emu);
        return { success: true, data: { command: args.join(' ') } };
    }

    // ========================================================================
    // 统一错误包装
    // ========================================================================

    async function wrap(func, params) {
        try {
            var result = await func(params);
            complete(result);
        } catch (error) {
            var msg = (error && error.message) ? error.message : String(error);
            complete({ success: false, message: '执行失败: ' + msg });
        }
    }

    return {
        create_emulator: function (p) { wrap(create_emulator, p); },
        list_emulators: function (p) { wrap(list_emulators, p); },
        delete_emulator: function (p) { wrap(delete_emulator, p); },
        start_vm: function (p) { wrap(start_vm, p); },
        stop_vm: function (p) { wrap(stop_vm, p); },
        get_vm_status: function (p) { wrap(get_vm_status, p); },
        configure_port_mapping: function (p) { wrap(configure_port_mapping, p); },
        list_port_mappings: function (p) { wrap(list_port_mappings, p); },
        remove_port_mapping: function (p) { wrap(remove_port_mapping, p); },
        execute_command: function (p) { wrap(execute_command, p); },
        get_system_info: function (p) { wrap(get_system_info, p); },
        get_process_list: function (p) { wrap(get_process_list, p); },
        upload_file: function (p) { wrap(upload_file, p); },
        download_file: function (p) { wrap(download_file, p); },
        install_package: function (p) { wrap(install_package, p); },
        configure_vnc: function (p) { wrap(configure_vnc, p); },
        get_vnc_info: function (p) { wrap(get_vnc_info, p); },
        add_disk_drive: function (p) { wrap(add_disk_drive, p); },
        configure_shared_folder: function (p) { wrap(configure_shared_folder, p); },
        get_qemu_logs: function (p) { wrap(get_qemu_logs, p); },
        get_qemu_command: function (p) { wrap(get_qemu_command, p); }
    };
})();

// CommonJS 导出
exports.create_emulator = HiSHPlugin.create_emulator;
exports.list_emulators = HiSHPlugin.list_emulators;
exports.delete_emulator = HiSHPlugin.delete_emulator;
exports.start_vm = HiSHPlugin.start_vm;
exports.stop_vm = HiSHPlugin.stop_vm;
exports.get_vm_status = HiSHPlugin.get_vm_status;
exports.configure_port_mapping = HiSHPlugin.configure_port_mapping;
exports.list_port_mappings = HiSHPlugin.list_port_mappings;
exports.remove_port_mapping = HiSHPlugin.remove_port_mapping;
exports.execute_command = HiSHPlugin.execute_command;
exports.get_system_info = HiSHPlugin.get_system_info;
exports.get_process_list = HiSHPlugin.get_process_list;
exports.upload_file = HiSHPlugin.upload_file;
exports.download_file = HiSHPlugin.download_file;
exports.install_package = HiSHPlugin.install_package;
exports.configure_vnc = HiSHPlugin.configure_vnc;
exports.get_vnc_info = HiSHPlugin.get_vnc_info;
exports.add_disk_drive = HiSHPlugin.add_disk_drive;
exports.configure_shared_folder = HiSHPlugin.configure_shared_folder;
exports.get_qemu_logs = HiSHPlugin.get_qemu_logs;
exports.get_qemu_command = HiSHPlugin.get_qemu_command;
