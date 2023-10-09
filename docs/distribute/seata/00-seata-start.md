---
sidebar: auto
prev: false
next: /distribute/seata/01-distribute-transaction-mode.html
---
# seata初体验
## 背景介绍
本文主要演示了通过部署一个`seata-server`分布式事务服务，启动一个业务服务端和业务客户端的方式简要展现了如何在实际业务中运用`seata`的过程。具体内容请往下阅读。
## seata系列
* seata官网地址： [https://seata.io/en/docs/user/quickstart/](https://seata.io/en/docs/user/quickstart/)
* seata服务端下载地址: [https://github.com/seata/seata/releases](https://github.com/seata/seata/releases)
    > 随便选择一个版本下载即可,我这里选择的是`1.7.1`,下载解压后在目录`/seata/script/server/docker-compose`下执行`docker-compose -p seata up -d`即可启动`seata-server`,为了更好区分可以在`docker-compose.yaml`文件中为其指定容器名字为`seata_server`，如果是指定为`seata-server`，该字符串会被切割
* `seata`官网地址：[https://github.com/seata](https://github.com/seata)
* `seata-go-server`源码地址：[https://github.com/seata/seata-go-server](https://github.com/seata/seata-go-server)
* `seata-go`源码地址：[https://github.com/seata/seata-go](https://github.com/seata/seata-go)
    > `seata`的客户端包，自己开发的`go`服务端程序会引用该包与`seata`的服务端程序进行通信。
* `seata-go-samples`源码地址：[https://github.com/seata/seata-go-samples](https://github.com/seata/seata-go-samples)
    > `seata-go`包的测试代码，用来测试`seata-go`的各项功能。

## 流程测试
### 环境准备
### 具体流程
* 启动`seata-server`
    > 该服务部署在docker里面，用启动docker容器的方式启动即可
* 启动`seata-go-samples`中服务端程序，服务端为：`seata-go-samples/tcc/gin/server/main.go`
* 各自日志如下所示

    `seata-server`日志如下所示：
    ```shell
    2023-10-07 11:37:59 11:37:59.602  INFO --- [ettyServerNIOWorker_1_2_4] [rocessor.server.RegTmProcessor] [      onRegTmMessage]  [] : TM register success,message:RegisterTMRequest{version='1.1.0', applicationId='seata-go-samples', transactionServiceGroup='default_tx_group', extraData=''},channel:[id: 0xcc4a8065, L:/172.24.0.2:8091 - R:/172.24.0.1:60292],client version:1.1.0
    2023-10-07 11:37:59 11:37:59.707  INFO --- [rverHandlerThread_1_2_500] [rocessor.server.RegRmProcessor] [      onRegRmMessage]  [] : RM register success,message:RegisterRMRequest{resourceIds='ginTccRMService', version='1.5.2', applicationId='seata-go-samples', transactionServiceGroup='default_tx_group', extraData='null'},channel:[id: 0xcc4a8065, L:/172.24.0.2:8091 - R:/172.24.0.1:60292],client version:1.5.2
    ```

    `seata-go-samples/tcc/gin/server/main.go`日志如下所示：
    ```shell
    [GIN-debug] [WARNING] Creating an Engine instance with the Logger and Recovery middleware already attached.

    [GIN-debug] [WARNING] Running in "debug" mode. Switch to "release" mode in production.
    - using env:	export GIN_MODE=release
    - using code:	gin.SetMode(gin.ReleaseMode)

    2023-10-07 11:37:59.186 	INFO	getty/listener.go:64                         	Open new getty session 
    2023-10-07 11:37:59.209 	INFO	getty/getty_remoting.go:79                   	send async message: {message.RpcMessage{ID:2, Type:0x2, Codec:0x1, Compressor:0x0, HeadMap:map[string]string(nil), Body:message.RegisterTMRequest{AbstractIdentifyRequest:message.AbstractIdentifyRequest{Version:"1.1.0", ApplicationId:"seata-go-samples", TransactionServiceGroup:"default_tx_group", ExtraData:[]uint8(nil)}}}}
    2023-10-07 11:37:59.290 	INFO	getty/getty_remoting.go:79                   	send async message: {message.RpcMessage{ID:1, Type:0x0, Codec:0x1, Compressor:0x0, HeadMap:map[string]string(nil), Body:message.RegisterRMRequest{AbstractIdentifyRequest:message.AbstractIdentifyRequest{Version:"1.5.2", ApplicationId:"seata-go-samples", TransactionServiceGroup:"default_tx_group", ExtraData:[]uint8(nil)}, ResourceIds:"ginTccRMService"}}}
    2023-10-07 11:37:59.601 	INFO	client/client_on_response_processor.go:48    	the rm client received  clientOnResponse msg message.RpcMessage{ID:2, Type:0x1, Codec:0x1, Compressor:0x0, HeadMap:map[string]string{}, Body:message.RegisterTMResponse{AbstractIdentifyResponse:message.AbstractIdentifyResponse{AbstractResultMessage:message.AbstractResultMessage{ResultCode:0x0, Msg:""}, Version:"2.0.0-SNAPSHOT", ExtraData:[]uint8(nil), Identified:true}}} from tc server.
    2023-10-07 11:37:59.722 	INFO	client/client_on_response_processor.go:48    	the rm client received  clientOnResponse msg message.RpcMessage{ID:1, Type:0x1, Codec:0x1, Compressor:0x0, HeadMap:map[string]string{}, Body:message.RegisterRMResponse{AbstractIdentifyResponse:message.AbstractIdentifyResponse{AbstractResultMessage:message.AbstractResultMessage{ResultCode:0x0, Msg:""}, Version:"2.0.0-SNAPSHOT", ExtraData:[]uint8(nil), Identified:true}}} from tc server.
    2023-10-07 11:37:59.722 	INFO	rm/rm_remoting.go:169                        	register RM success. response: message.RegisterRMResponse{AbstractIdentifyResponse:message.AbstractIdentifyResponse{AbstractResultMessage:message.AbstractResultMessage{ResultCode:0x0, Msg:""}, Version:"2.0.0-SNAPSHOT", ExtraData:[]uint8(nil), Identified:true}}
    [GIN-debug] POST   /prepare                  --> main.main.func1 (4 handlers)
    [GIN-debug] [WARNING] You trusted all proxies, this is NOT safe. We recommend you to set a value.
    Please check https://pkg.go.dev/github.com/gin-gonic/gin#readme-don-t-trust-all-proxies for details.
    [GIN-debug] Listening and serving HTTP on :8080

    ```
    > 以上日志只是运行`seata-go-samples/tcc/gin/server/main.go`产生的日志，说明`gin`的服务端程序(它自己本身作为`seata-server`的客户端)已经正常连接到远程的`seata-server`服务端程序。
* 启动`gin`的客户端进行测试，代码在`seata-go-samples/tcc/gin/client/main.go`，各自的日志如下所示
`gin-client`的日志如下：
    ```shell
    2023-10-07 11:47:09.479 	INFO	getty/listener.go:64                         	Open new getty session 
    2023-10-07 11:47:09.503 	INFO	getty/getty_remoting.go:79                   	send async message: {message.RpcMessage{ID:2, Type:0x2, Codec:0x1, Compressor:0x0, HeadMap:map[string]string(nil), Body:message.RegisterTMRequest{AbstractIdentifyRequest:message.AbstractIdentifyRequest{Version:"1.1.0", ApplicationId:"seata-go-samples", TransactionServiceGroup:"default_tx_group", ExtraData:[]uint8(nil)}}}}
    2023-10-07 11:47:09.576 	INFO	getty/getty_remoting.go:79                   	send async message: {message.RpcMessage{ID:1, Type:0x0, Codec:0x1, Compressor:0x0, HeadMap:map[string]string(nil), Body:message.GlobalBeginRequest{Timeout:60000000000, TransactionName:"TccSampleLocalGlobalTx"}}}
    2023-10-07 11:47:09.700 	INFO	client/client_on_response_processor.go:48    	the rm client received  clientOnResponse msg message.RpcMessage{ID:2, Type:0x1, Codec:0x1, Compressor:0x0, HeadMap:map[string]string{}, Body:message.RegisterTMResponse{AbstractIdentifyResponse:message.AbstractIdentifyResponse{AbstractResultMessage:message.AbstractResultMessage{ResultCode:0x0, Msg:""}, Version:"2.0.0-SNAPSHOT", ExtraData:[]uint8(nil), Identified:true}}} from tc server.
    2023-10-07 11:47:10.386 	INFO	client/client_on_response_processor.go:48    	the rm client received  clientOnResponse msg message.RpcMessage{ID:1, Type:0x1, Codec:0x1, Compressor:0x0, HeadMap:map[string]string{}, Body:message.GlobalBeginResponse{AbstractTransactionResponse:message.AbstractTransactionResponse{AbstractResultMessage:message.AbstractResultMessage{ResultCode:0x1, Msg:""}, TransactionErrorCode:0}, Xid:"172.24.0.2:8091:18457631252647937", ExtraData:[]uint8{}}} from tc server.
    2023-10-07 11:47:10.386 	INFO	tm/global_transaction.go:66                  	GlobalBeginRequest success, res {{{1 } 0} 172.24.0.2:8091:18457631252647937 []}
    2023-10-07 11:47:10.386 	INFO	client/main.go:48                            	branch transaction begin
    2023-10-07 11:47:10.446 	INFO	client/main.go:53                            	resp: &{200 OK 200 HTTP/1.1 1 1 map[Content-Length:[12] Content-Type:[application/json; charset=utf-8] Date:[Sat, 07 Oct 2023 03:47:10 GMT] Retry-Count:[0]] {"prepare ok"} 12 [] true false map[] 0xc0001e4400 <nil>} body: "prepare ok" 
    2023-10-07 11:47:10.446 	INFO	getty/getty_remoting.go:79                   	send async message: {message.RpcMessage{ID:3, Type:0x0, Codec:0x1, Compressor:0x0, HeadMap:map[string]string(nil), Body:message.GlobalCommitRequest{AbstractGlobalEndRequest:message.AbstractGlobalEndRequest{Xid:"172.24.0.2:8091:18457631252647937", ExtraData:[]uint8(nil)}}}}
    2023-10-07 11:47:10.575 	INFO	client/client_on_response_processor.go:48    	the rm client received  clientOnResponse msg message.RpcMessage{ID:3, Type:0x1, Codec:0x1, Compressor:0x0, HeadMap:map[string]string{}, Body:message.GlobalCommitResponse{AbstractGlobalEndResponse:message.AbstractGlobalEndResponse{AbstractTransactionResponse:message.AbstractTransactionResponse{AbstractResultMessage:message.AbstractResultMessage{ResultCode:0x1, Msg:""}, TransactionErrorCode:0}, GlobalStatus:0x9}}} from tc server.
    2023-10-07 11:47:10.575 	INFO	tm/global_transaction.go:107                 	send global commit request success, xid 172.24.0.2:8091:18457631252647937
    ```
    > 从`send global commit request success, xid 172.24.0.`可以看到，本次全局事务提交成功，说明事务正常完成了。

    `gin-server`的日志如下：

    ```shell
    2023-10-07 11:47:10.388 	INFO	gin/gin_transaction_middleware.go:50         	global transaction xid is :172.24.0.2:8091:18457631252647937
    2023-10-07 11:47:10.395 	INFO	getty/getty_remoting.go:79                   	send async message: {message.RpcMessage{ID:3, Type:0x0, Codec:0x1, Compressor:0x0, HeadMap:map[string]string(nil), Body:message.BranchRegisterRequest{Xid:"172.24.0.2:8091:18457631252647937", BranchType:1, ResourceId:"ginTccRMService", LockKey:"", ApplicationData:[]uint8{0x7b, 0x22, 0x61, 0x63, 0x74, 0x69, 0x6f, 0x6e, 0x43, 0x6f, 0x6e, 0x74, 0x65, 0x78, 0x74, 0x22, 0x3a, 0x7b, 0x22, 0x61, 0x63, 0x74, 0x69, 0x6f, 0x6e, 0x2d, 0x73, 0x74, 0x61, 0x72, 0x74, 0x2d, 0x74, 0x69, 0x6d, 0x65, 0x22, 0x3a, 0x31, 0x36, 0x39, 0x36, 0x36, 0x35, 0x30, 0x34, 0x33, 0x30, 0x33, 0x38, 0x38, 0x2c, 0x22, 0x61, 0x63, 0x74, 0x69, 0x6f, 0x6e, 0x4e, 0x61, 0x6d, 0x65, 0x22, 0x3a, 0x22, 0x67, 0x69, 0x6e, 0x54, 0x63, 0x63, 0x52, 0x4d, 0x53, 0x65, 0x72, 0x76, 0x69, 0x63, 0x65, 0x22, 0x2c, 0x22, 0x68, 0x6f, 0x73, 0x74, 0x2d, 0x6e, 0x61, 0x6d, 0x65, 0x22, 0x3a, 0x22, 0x31, 0x39, 0x32, 0x2e, 0x31, 0x36, 0x38, 0x2e, 0x33, 0x36, 0x2e, 0x32, 0x34, 0x22, 0x2c, 0x22, 0x73, 0x79, 0x73, 0x3a, 0x3a, 0x63, 0x6f, 0x6d, 0x6d, 0x69, 0x74, 0x22, 0x3a, 0x22, 0x43, 0x6f, 0x6d, 0x6d, 0x69, 0x74, 0x22, 0x2c, 0x22, 0x73, 0x79, 0x73, 0x3a, 0x3a, 0x70, 0x72, 0x65, 0x70, 0x61, 0x72, 0x65, 0x22, 0x3a, 0x22, 0x50, 0x72, 0x65, 0x70, 0x61, 0x72, 0x65, 0x22, 0x2c, 0x22, 0x73, 0x79, 0x73, 0x3a, 0x3a, 0x72, 0x6f, 0x6c, 0x6c, 0x62, 0x61, 0x63, 0x6b, 0x22, 0x3a, 0x22, 0x52, 0x6f, 0x6c, 0x6c, 0x62, 0x61, 0x63, 0x6b, 0x22, 0x7d, 0x7d}}}}
    2023-10-07 11:47:10.444 	INFO	client/client_on_response_processor.go:48    	the rm client received  clientOnResponse msg message.RpcMessage{ID:3, Type:0x1, Codec:0x1, Compressor:0x0, HeadMap:map[string]string{}, Body:message.BranchRegisterResponse{AbstractTransactionResponse:message.AbstractTransactionResponse{AbstractResultMessage:message.AbstractResultMessage{ResultCode:0x1, Msg:""}, TransactionErrorCode:0}, BranchId:18457631252647938}} from tc server.
    2023-10-07 11:47:10.445 	INFO	server/service.go:32                         	gin 服务端事务 预提交 RMService Prepare, param 
    [GIN] 2023/10/07 - 11:47:10 | 200 |     56.9141ms |       127.0.0.1 | POST     "/prepare"
    2023-10-07 11:47:10.548 	INFO	client/rm_branch_commit_processor.go:38      	the rm client received  rmBranchCommit msg message.RpcMessage{ID:1, Type:0x0, Codec:0x1, Compressor:0x0, HeadMap:map[string]string{}, Body:message.BranchCommitRequest{AbstractBranchEndRequest:message.AbstractBranchEndRequest{MessageTypeAware:message.MessageTypeAware(nil), Xid:"172.24.0.2:8091:18457631252647937", BranchId:18457631252647938, BranchType:1, ResourceId:"ginTccRMService", ApplicationData:[]uint8{0x7b, 0x22, 0x61, 0x63, 0x74, 0x69, 0x6f, 0x6e, 0x43, 0x6f, 0x6e, 0x74, 0x65, 0x78, 0x74, 0x22, 0x3a, 0x7b, 0x22, 0x61, 0x63, 0x74, 0x69, 0x6f, 0x6e, 0x2d, 0x73, 0x74, 0x61, 0x72, 0x74, 0x2d, 0x74, 0x69, 0x6d, 0x65, 0x22, 0x3a, 0x31, 0x36, 0x39, 0x36, 0x36, 0x35, 0x30, 0x34, 0x33, 0x30, 0x33, 0x38, 0x38, 0x2c, 0x22, 0x61, 0x63, 0x74, 0x69, 0x6f, 0x6e, 0x4e, 0x61, 0x6d, 0x65, 0x22, 0x3a, 0x22, 0x67, 0x69, 0x6e, 0x54, 0x63, 0x63, 0x52, 0x4d, 0x53, 0x65, 0x72, 0x76, 0x69, 0x63, 0x65, 0x22, 0x2c, 0x22, 0x68, 0x6f, 0x73, 0x74, 0x2d, 0x6e, 0x61, 0x6d, 0x65, 0x22, 0x3a, 0x22, 0x31, 0x39, 0x32, 0x2e, 0x31, 0x36, 0x38, 0x2e, 0x33, 0x36, 0x2e, 0x32, 0x34, 0x22, 0x2c, 0x22, 0x73, 0x79, 0x73, 0x3a, 0x3a, 0x63, 0x6f, 0x6d, 0x6d, 0x69, 0x74, 0x22, 0x3a, 0x22, 0x43, 0x6f, 0x6d, 0x6d, 0x69, 0x74, 0x22, 0x2c, 0x22, 0x73, 0x79, 0x73, 0x3a, 0x3a, 0x70, 0x72, 0x65, 0x70, 0x61, 0x72, 0x65, 0x22, 0x3a, 0x22, 0x50, 0x72, 0x65, 0x70, 0x61, 0x72, 0x65, 0x22, 0x2c, 0x22, 0x73, 0x79, 0x73, 0x3a, 0x3a, 0x72, 0x6f, 0x6c, 0x6c, 0x62, 0x61, 0x63, 0x6b, 0x22, 0x3a, 0x22, 0x52, 0x6f, 0x6c, 0x6c, 0x62, 0x61, 0x63, 0x6b, 0x22, 0x7d, 0x7d}}}} from tc server.
    2023-10-07 11:47:10.548 	INFO	client/rm_branch_commit_processor.go:44      	Branch committing: xid 172.24.0.2:8091:18457631252647937, branchID 18457631252647938, resourceID ginTccRMService, applicationData {"actionContext":{"action-start-time":1696650430388,"actionName":"ginTccRMService","host-name":"192.168.36.24","sys::commit":"Commit","sys::prepare":"Prepare","sys::rollback":"Rollback"}}
    2023-10-07 11:47:10.548 	INFO	server/service.go:38                         	gin 服务端事务 提交 RMService Commit, param &{172.24.0.2:8091:18457631252647937 18457631252647938 ginTccRMService false false map[action-start-time:1.696650430388e+12 actionName:ginTccRMService host-name:192.168.36.24 sys::commit:Commit sys::prepare:Prepare sys::rollback:Rollback]}
    2023-10-07 11:47:10.548 	INFO	client/rm_branch_commit_processor.go:57      	branch commit success: xid 172.24.0.2:8091:18457631252647937, branchID %!s(int64=18457631252647938), resourceID ginTccRMService, applicationData {"actionContext":{"action-start-time":1696650430388,"actionName":"ginTccRMService","host-name":"192.168.36.24","sys::commit":"Commit","sys::prepare":"Prepare","sys::rollback":"Rollback"}}
    2023-10-07 11:47:10.548 	INFO	getty/getty_remoting.go:79                   	send async message: {message.RpcMessage{ID:1, Type:0x1, Codec:0x1, Compressor:0x0, HeadMap:map[string]string(nil), Body:message.BranchCommitResponse{AbstractBranchEndResponse:message.AbstractBranchEndResponse{AbstractTransactionResponse:message.AbstractTransactionResponse{AbstractResultMessage:message.AbstractResultMessage{ResultCode:0x1, Msg:""}, TransactionErrorCode:0}, Xid:"172.24.0.2:8091:18457631252647937", BranchId:18457631252647938, BranchStatus:5}}}}
    2023-10-07 11:47:10.549 	INFO	client/rm_branch_commit_processor.go:90      	send branch commit success: xid 172.24.0.2:8091:18457631252647937, branchID 18457631252647938, resourceID ginTccRMService, applicationData [123 34 97 99 116 105 111 110 67 111 110 116 101 120 116 34 58 123 34 97 99 116 105 111 110 45 115 116 97 114 116 45 116 105 109 101 34 58 49 54 57 54 54 53 48 52 51 48 51 56 56 44 34 97 99 116 105 111 110 78 97 109 101 34 58 34 103 105 110 84 99 99 82 77 83 101 114 118 105 99 101 34 44 34 104 111 115 116 45 110 97 109 101 34 58 34 49 57 50 46 49 54 56 46 51 54 46 50 52 34 44 34 115 121 115 58 58 99 111 109 109 105 116 34 58 34 67 111 109 109 105 116 34 44 34 115 121 115 58 58 112 114 101 112 97 114 101 34 58 34 80 114 101 112 97 114 101 34 44 34 115 121 115 58 58 114 111 108 108 98 97 99 107 34 58 34 82 111 108 108 98 97 99 107 34 125 125]
    ```
    > 从上面日志看出`gin-server`对`gin-client`的`/prepare`请求做了一次预提交和全局提交(向`seata-server`提交)，提交成功，向`gin-client`返回提交成功。

    `seata-server`端的日志如下所示：

    ```shell
    2023-10-07 11:47:09 11:47:09.689  INFO --- [ettyServerNIOWorker_1_3_4] [rocessor.server.RegTmProcessor] [      onRegTmMessage]  [] : TM register success,message:RegisterTMRequest{version='1.1.0', applicationId='seata-go-samples', transactionServiceGroup='default_tx_group', extraData=''},channel:[id: 0xa8596cb7, L:/172.24.0.2:8091 - R:/172.24.0.1:39432],client version:1.1.0
    2023-10-07 11:47:09 11:47:09.886  INFO --- [     batchLoggerPrint_1_1] [ocessor.server.BatchLogHandler] [                 run]  [] : receive msg[single]: GlobalBeginRequest{transactionName='TccSampleLocalGlobalTx', timeout=60000}, clientIp: 172.24.0.1, vgroup: default_tx_group
    2023-10-07 11:47:10 11:47:10.361  INFO --- [rverHandlerThread_1_3_500] [coordinator.DefaultCoordinator] [       doGlobalBegin]  [172.24.0.2:8091:18457631252647937] : Begin new global transaction applicationId: seata-go-samples,transactionServiceGroup: default_tx_group, transactionName: TccSampleLocalGlobalTx,timeout:60000,xid:172.24.0.2:8091:18457631252647937
    2023-10-07 11:47:10 11:47:10.386  INFO --- [     batchLoggerPrint_1_1] [ocessor.server.BatchLogHandler] [                 run]  [] : result msg[single]: GlobalBeginResponse{xid='172.24.0.2:8091:18457631252647937', extraData='null', resultCode=Success, msg='null'}, clientIp: 172.24.0.1, vgroup: default_tx_group
    2023-10-07 11:47:10 11:47:10.406  INFO --- [     batchLoggerPrint_1_1] [ocessor.server.BatchLogHandler] [                 run]  [] : receive msg[single]: BranchRegisterRequest{xid='172.24.0.2:8091:18457631252647937', branchType=TCC, resourceId='ginTccRMService', lockKey='null', applicationData='{"actionContext":{"action-start-time":1696650430388,"actionName":"ginTccRMService","host-name":"192.168.36.24","sys::commit":"Commit","sys::prepare":"Prepare","sys::rollback":"Rollback"}}'}, clientIp: 172.24.0.1, vgroup: default_tx_group
    2023-10-07 11:47:10 11:47:10.441  INFO --- [rverHandlerThread_1_4_500] [erver.coordinator.AbstractCore] [bda$branchRegister$0]  [172.24.0.2:8091:18457631252647937] : Register branch successfully, xid = 172.24.0.2:8091:18457631252647937, branchId = 18457631252647938, resourceId = ginTccRMService ,lockKeys = null
    2023-10-07 11:47:10 11:47:10.444  INFO --- [     batchLoggerPrint_1_1] [ocessor.server.BatchLogHandler] [                 run]  [] : result msg[single]: BranchRegisterResponse{branchId=18457631252647938, resultCode=Success, msg='null'}, clientIp: 172.24.0.1, vgroup: default_tx_group
    2023-10-07 11:47:10 11:47:10.467  INFO --- [     batchLoggerPrint_1_1] [ocessor.server.BatchLogHandler] [                 run]  [] : receive msg[single]: GlobalCommitRequest{xid='172.24.0.2:8091:18457631252647937', extraData='null'}, clientIp: 172.24.0.1, vgroup: default_tx_group
    2023-10-07 11:47:10 11:47:10.556  INFO --- [     batchLoggerPrint_1_1] [ocessor.server.BatchLogHandler] [                 run]  [] : receive msg[single]: BranchCommitResponse{xid='172.24.0.2:8091:18457631252647937', branchId=18457631252647938, branchStatus=PhaseTwo_Committed, resultCode=Success, msg='null'}, clientIp: 172.24.0.1, vgroup: default_tx_group
    2023-10-07 11:47:10 11:47:10.569  INFO --- [rverHandlerThread_1_5_500] [server.coordinator.DefaultCore] [bda$doGlobalCommit$1]  [172.24.0.2:8091:18457631252647937] : Commit branch transaction successfully, xid = 172.24.0.2:8091:18457631252647937 branchId = 18457631252647938
    2023-10-07 11:47:10 11:47:10.571  INFO --- [rverHandlerThread_1_5_500] [server.coordinator.DefaultCore] [      doGlobalCommit]  [172.24.0.2:8091:18457631252647937] : Committing global transaction is successfully done, xid = 172.24.0.2:8091:18457631252647937.
    2023-10-07 11:47:10 11:47:10.576  INFO --- [     batchLoggerPrint_1_1] [ocessor.server.BatchLogHandler] [                 run]  [] : result msg[single]: GlobalCommitResponse{globalStatus=Committed, resultCode=Success, msg='null'}, clientIp: 172.24.0.1, vgroup: default_tx_group
    2023-10-07 11:47:10 11:47:10.630  INFO --- [ettyServerNIOWorker_1_3_4] [ty.AbstractNettyRemotingServer] [    handleDisconnect]  [] : 172.24.0.1:39432 to server channel inactive.
    2023-10-07 11:47:10 11:47:10.630  INFO --- [ettyServerNIOWorker_1_3_4] [ty.AbstractNettyRemotingServer] [    handleDisconnect]  [] : remove channel:[id: 0xa8596cb7, L:/172.24.0.2:8091 ! R:/172.24.0.1:39432]context:RpcContext{applicationId='seata-go-samples', transactionServiceGroup='default_tx_group', clientId='seata-go-samples:172.24.0.1:39432', channel=[id: 0xa8596cb7, L:/172.24.0.2:8091 ! R:/172.24.0.1:39432], resourceSets=null}
    ```
    > 从上可以看到，`seata-server`收到`gin-server`的一次全局提交请求，后续完成关于该次请求的分支注册、提交、返回响应等一系列操作来完成本次从`gin-client`到`gin-server`到`seata-server`的整个事务过程。

* `gin-server`断开与`seata-server`的连接。下面是断开连接时`seata-server`中的日志
    ```shell
    2023-10-07 13:32:26 13:32:26.371  INFO --- [ettyServerNIOWorker_1_2_4] [ty.AbstractNettyRemotingServer] [    handleDisconnect]  [] : 172.24.0.1:60292 to server channel inactive.
    2023-10-07 13:32:26 13:32:26.388  INFO --- [ettyServerNIOWorker_1_2_4] [ty.AbstractNettyRemotingServer] [    handleDisconnect]  [] : remove channel:[id: 0xcc4a8065, L:/172.24.0.2:8091 ! R:/172.24.0.1:60292]context:RpcContext{applicationId='seata-go-samples', transactionServiceGroup='default_tx_group', clientId='seata-go-samples:172.24.0.1:60292', channel=[id: 0xcc4a8065, L:/172.24.0.2:8091 ! R:/172.24.0.1:60292], resourceSets=[]}
    ```